const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId ,
        ref:"user"
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String ,
        required:true 
    },
    createdAt:{
        type:Date ,
        default:Date.now
    },
    refreshToken:{
        type:String ,
        default:null
    }

})

const User = mongoose.model("User" ,userSchema);
module.exports = User;