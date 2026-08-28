const express = require("express");

const app = express();
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api" ,userRoutes);
app.use("/api" ,todoRoutes)
connectDB();


app.get("/", (req, res) => {
    res.json({
        message: "Todo API is running!"
    });
})

app.get("/todos" , (req ,res) => {
    res.json({
        Message: "todo created"
    })
})

app.post("/todos" , (req, res) => {
    console.log(req.body);
    res.status(201).json({
        message: "todo recieved",
        todo: req.body
    })
})


app.listen(3000 , () => {
    console.log("serevr is running on port 3000")
})

