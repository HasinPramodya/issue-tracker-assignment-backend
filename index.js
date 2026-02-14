import dotenv from "dotenv"
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from "./routes/userRouter.js";
import issueRouter from "./routes/issueRouter.js";
import { authUser } from "./middleware/auth.middleware.js";

dotenv.config();

let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authUser)

app.get("/", (req, res) => {
    res.send("Backend is running!");
})

app.use("/api/user", userRouter);
app.use("/api/issue", issueRouter);



mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database Connected!");
    app.listen(process.env.PORT, () => {
        console.log("app is stated at port " + process.env.PORT);
    })
}).catch(() => {
    console.log("Connection Failed!")
});



