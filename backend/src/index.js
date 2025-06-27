import express from "express";
import cors from "cors"
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";

import path from "path";

import dotenv from "dotenv"

import cookieParser from "cookie-parser";

import { dbConnect } from "./lib/server.js";
import { app ,server } from "./utils/sodket.js";

dotenv.config();
const PORT=process.env.PORT || 4001 ;


const __dirname =path.resolve();


app.use(cookieParser());
app.use(cors({
    origin:true, 
    credentials:true,
}));
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/message", messageRoute);

if (process.env.NODE_ENV === "production") {
    console.log("Serving static build...");
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*", (req, res) => {
        console.log("Catch-all route hit");
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

server.listen(PORT,()=>{
    console.log("server start at port ",PORT);
    dbConnect(process.env.DB_URL);
})

