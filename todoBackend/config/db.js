const mongoose = require("mongoose");

const connectDB = async () => {
      try {
        await mongoose.connect("mongodb://localhost:27017/todo_app");

        console.log("mongodb connect")
      }

      catch(error){
        console.error("mongo db connection gfailed:", error.message);
        process.exit(1);

      }
    };



module.exports = connectDB;
