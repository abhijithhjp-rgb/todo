const express = require("express")

const User = require("../models/User")
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

const authMiddleware = require("../middleware/authMiddleware");


const jwt = require("jsonwebtoken");

router.post("/user" ,async (req , res) => {
    
    const hashedPassword = await bcrypt.hash(req.body.password , 10);
    const user = {
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    }


    const createdUser = await User.create(user);
    res.status(201).json({
        message:"user created",
        user:createdUser
    });

} )



router.post("/user/login" ,async (req ,res) =>{

    const user = await User.findOne({
        email: req.body.email
    })

    if(user){
        const login = await bcrypt.compare(req.body.password , user.password);
        if(login){
            const accessToken = jwt.sign({ userId: user._id} ,process.env.JWT_SECRET , {expiresIn:"15m"});
            const refreshToken = jwt.sign({ userId: user._id} ,process.env.JWT_REFRESH_SECRET , {expiresIn:"7d"});
            user.refreshToken = refreshToken;
            await user.save();
            
            res.cookie("refreshToken" , refreshToken ,{
                httpOnly:true ,
                secure:false,
                sameSite: "lax" ,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })


            res.status(200).json({
                message: "user logged in"  ,
                accessToken:accessToken
            })
        }
        else {
            res.status(401).json({
                message:"invalid password"
            })
        }
    }
    else {
        res.status(401).json({
            message:"user not found"
        })
    }
})

router.post("/user/refresh" ,async (req ,res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message:"refreshToken is missing"
        })
    }
    let decoded ;
    try {
       decoded = jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET);
    }
    catch(error){
        res.status(400).json({
            message:"Invalid or expired refresh token" ,

        })
    }

    const user = await User.findById(decoded.userId)
    if(!user || user.refreshToken != refreshToken){
        res.status(401).json({
            message:"refresh token is not matching"
        })
       
    }
    else {
        const accessToken = jwt.sign({userId:user._id} , process.env.JWT_SECRET ,{expiresIn:"15m"});
        res.status(200).json({
            accessToken
        })
    }
    const newRefreshToken = jwt.sign( {
        userId:user._id} ,
        process.env.JWT_REFRESH_SECRET ,
        {expiresIn : "7d" }
    )

    user.refreshToken = newRefreshToken ;
    await user.save()

    res.cookie("refreshToken " , newRefreshToken , {
         httpOnly: true,
         secure: false,
         sameSite: "lax",
         maxAge: 7 * 24 * 60 * 60 * 1000
    })

})

router.post("/user/logout" , authMiddleware , async (req , res) => {
    const user = await User.findOne({
        user:req.user.useId ,

    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    user.refreshToken = null;
    await user.save();
    res.clearCookie("refershToken");

    res.status(200).json({
        message: "logged out successfully"
    })
}) 

module.exports = router;