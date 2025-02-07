const express = require("express");
const { logReqRes } = require("./middlewares");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// ✅ MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/test-project").then(() => {
    console.log("MongoDB Connected");
});


app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

// ✅ Custom Middleware
app.use(logReqRes("log.txt"));

// ✅ Routes 
app.use("/api/user", userRouter);

// ✅ Start Server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
