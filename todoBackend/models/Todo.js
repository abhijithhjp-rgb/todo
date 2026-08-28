const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String ,
        required: true ,
    } ,
    description: {
        type: String
    } ,
    completed: {
        type:Boolean ,
        default: false
    },
    assignedDate:{
        type:Date,
        default: Date.now
    },

    expiryDate:{
        type:Date,
        
    },
    priority:{
        type:String,
        enum: ["low" ,"medium" ,"high"],
        default: "medium"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    
});

const Todo = mongoose.model("Todo" ,todoSchema);

module.exports = Todo;