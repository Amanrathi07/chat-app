import express from "express";
import { addUserForSideBar, getMessage, sendMessage } from "../controllers/message.controller.js";
import {checkJWT, protectedRoute} from "../middleware/message.middleware.js"
const router=express.Router();

router.get("/allUser",checkJWT,addUserForSideBar);

router.get("/user/:id",checkJWT,getMessage);

router.post("/send/:id",protectedRoute,sendMessage);



export default router ;