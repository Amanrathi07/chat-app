import mongoose from "mongoose";

export async function dbConnect(url){
    try {
        await mongoose.connect(url);
        console.log("db connected")
        
    } catch (error) {
        console.log("rrror",error)
    }
}