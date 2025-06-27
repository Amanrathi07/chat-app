import express from "express";
import { signup,login,logout, updateUser, checkAuth } from "../controllers/user.controller.js";
import { cookieCheak, login_middleware, Signup_middleware } from "../middleware/user.middleware.js";
const router =express.Router()

router.post("/signup",Signup_middleware,signup)
router.post("/login",login_middleware,login)

router.get("/logout",cookieCheak,logout)

router.put("/user",cookieCheak,updateUser)

router.get("/check",cookieCheak,checkAuth)
export default router ;