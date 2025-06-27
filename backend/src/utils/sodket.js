import {Server} from "socket.io";
import http from "http";
import express from "express";


const app =express();

const server =http.createServer(app) ;




const io = new Server(server,{
    cors:{
        origin:["http://localhost:5175"] || true
    }
})


const userSocketMap={};



io.on("connection",(socket)=>{

    console.log("a user is conected ",socket.id);

    const userID = socket.handshake.query.userID;
    if(userID) userSocketMap[userID]=socket.id ;
 
    

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("a user id disconnected",socket.id);

        delete userSocketMap[userID] ;
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})



function getReseverSocketId(userId){
    return userSocketMap[userId]
}


export {app , server , io ,getReseverSocketId}