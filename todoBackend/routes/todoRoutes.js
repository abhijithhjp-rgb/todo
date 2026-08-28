const express = require("express");
const Todo = require("../models/Todo");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();


router.post("/todos",authMiddleware ,async (req , res) => {
    const todo = {
        user:req.user.userId ,
        title:req.body.title,
        description:req.body.description,
        priority:req.body.priority,
        expiryDate:req.body.expiryDate
    }

    const createdTodo = await Todo.create(todo);
    res.status(201).json({
        message:"todo created",
        todo:createdTodo
    });

} )

router.get("/todos" , authMiddleware , async (req , res) => {
    const fetchedTodo = await Todo.find({
        user:req.user.userId
    })
    res.status(200).json({
        message: "todo is fetched" , 
        todo:fetchedTodo
    })
})




router.get("/todos/status" , authMiddleware , async (req , res )=>{
    const allTodos = await Todo.find({
        user:req.user.userId

    })
    if(allTodos.length === 0){
        return res.status(404).json({
            message: "user dont have todos"
        })
    }
    const completed = []
    const pending = []
    const expired = []

    allTodos.forEach((todo ) => {

            if(todo.completed === true){
                completed.push(todo);
            }
            else if(todo.expiryDate < new Date()){
                expired.push(todo);
            }
            else{
                pending.push(todo); 
            }
   })
   res.status(200).json({
    completed:completed ,
    expired:expired ,
    pending:pending

})

})


router.get("/todos/today" , authMiddleware , async (req , res ) =>{
    const today = new Date()
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);


    const todaysTodo = await Todo.find({
        user:req.user.userId ,
        assignedDate:{
            $gte: today ,
            $lt:tomorrow
        }
    })

    if(todaysTodo.length === 0){
        return res.status(404).json({
            message:"no todo for today"
        })
    }
    res.status(200).json({
        message:"found todays todo" ,
        todo: todaysTodo
    })
})


router.get("/todos/today/pending" , authMiddleware ,async (req ,res) =>{


    const today = new Date()
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysPending = await Todo.find({
        user:req.user.userId ,
        assignedDate: {
            $gte:today ,
            $lt:tomorrow
        } ,
        completed:false ,
        $or:[
            {expiryDate: {$gte: today}} ,
            {expiryDate: {$exists: false}}
        ]
    })
    if(todaysPending.length === 0){
        return res.status(200).json({
            message:"no todos are pending"
        })
    }
    res.status(200).json({
        message:"pending todos found" ,
        todo:todaysPending
    })

})

router.get("/todos/today/expired" , authMiddleware ,async (req ,res) =>{

    const expired = await Todo.find({
        user:req.user.userId ,
        completed:false ,
        expiryDate:{
            $lt:new Date()
        }
    })
    if(expired.length === 0){
        return res.status(200).json({
            message:"no todos are expired"
        })
    }
    res.status(200).json({
        message:"expired  todos found" ,
        todo:expired
    })

})


router.get("/todos/:id" , authMiddleware , async (req , res) => {
    const fetchedTodo = await Todo.findOne({
          _id : req.params.id ,
          user : req.user.userId
    })
    if(!fetchedTodo){
        return res.status(404).json({
            message:"todo not found"
        })
    }

    res.status(200).json({
        message:"todo fetched",
        todo: fetchedTodo
    })
})




router.delete("/todos/:id" , authMiddleware , async (req , res) => {
    const deletedTodo = await Todo.findOneAndDelete({
        user:req.user.userId ,
        _id:req.params.id
    })
    if(!deletedTodo){
        return res.status(404).json({
            message:"todo doesnt exist"
        })
    }
    res.status(200).json({
        message:"todo deleted" ,
        todo:deletedTodo
    })

})

router.put("/todos/:id" , authMiddleware , async (req , res) => {
    const updatedTodo = await Todo.findOneAndUpdate({
          _id : req.params.id ,
          user : req.user.userId
    } , {
        itle:req.body.title,
        description:req.body.description,
        priority:req.body.priority,
        expiryDate:req.body.expiryDate,
        completed:req.body.completed
        
    },
    {
        new:true
    });

    if(!updatedTodo){
        return res.status(404).json({
            messge:"todo not found"
        })
    }

    res.status(200).json({
        message:"todo updated",
        todo: fetchedTodo
    })
})

router.patch("/todos/:id/completed" , authMiddleware , async (req ,res ) =>{
    const editedTodo = await Todo.findOne({
        user:req.user.userId ,
        _id:req.params.id 
    })
    if(!editedTodo){
        return res.status(404).json({
            message:"todo not found"
        })
    }
    editedTodo.completed = true;
    await editedTodo.save();
    res.status(200).json({
        message:"toodo marked completed" ,
        todo:editedTodo 
    })

})



router.patch("/todos/:id/tomorrow" , authMiddleware , async (req , res ) => {
    const editingTodo = await Todo.findOne({
        user:req.user.userId ,
        _id:req.params.id
    })
    if(!editingTodo){
        res.status(404).json({
            message:"todo doesnt found"
        })
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    editingTodo.assignedDate = tomorrow ;
    editingTodo.save()

    res.status(200).json({
        message: "todo pushed to tomorrow",
        todo: editingTodo
    });
})









module.exports = router;