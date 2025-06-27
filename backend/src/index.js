import express from "express";
import cors from "cors"
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"

import dotenv from "dotenv"

import cookieParser from "cookie-parser";

import { dbConnect } from "./lib/server.js";
import { app ,server } from "./utils/sodket.js";

dotenv.config();
const PORT=process.env.PORT





app.use(cookieParser());
app.use(cors({
    origin:true, 
    credentials:true,
}));
app.use(express.json());

app.use("/v1/auth",authRoute);
app.use("/v1/message",messageRoute);



server.listen(PORT,()=>{
    console.log("server start at port 3000");
    dbConnect(process.env.DB_URL);
})

