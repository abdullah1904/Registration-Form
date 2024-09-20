import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {config} from "dotenv"
import { appRouter } from "./routes";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRouter);

mongoose.connect(process.env.MONGODB_URI!,{dbName: "MiniProject"})
.then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`App is running on port ${process.env.PORT}`);
    })
})
.catch((error:any)=>{
    console.log("Error: ",error.message);
})
