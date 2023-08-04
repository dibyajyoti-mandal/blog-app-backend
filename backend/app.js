import express from "express";
import mongoose from 'mongoose'
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


mongoose.connect('mongodb+srv://admin:3ug94SCw9CukyVO1@cluster0.0xe1zks.mongodb.net/?retryWrites=true&w=majority'
).then(() => app.listen(5000)).then(() => console.log("success!!!")
).catch((err) => console.log(err));

app.use("/api", (req, res, next) => {
    res.send("hello")
})

