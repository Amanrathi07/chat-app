import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"


export async function Signup_middleware(req,res,next){
    try {
        const {name,email,password}=req.body;
       
        if(!name || !email || !password){
            return res.status(400).json({message:'all value are required'})
        }
        const userExist=await userModel.findOne({email:email});
        if(password.length<6){
            return res.status(400).json({message:'password must be at least 6 characters'})
        }
        if(userExist){
            return res.status(400).json({message:'user already exists'})
            
        }
        next()
    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}

export async function login_middleware(req,res,next){
    try {
        const {email,password}=req.body;
        
        
        if(!email || !password){
            return res.status(400).json({message:'all value are required'})
        }
        
        if(password.length<6){
            return res.status(400).json({message:'password must be at least 6 characters'})
        }
       
        next()
    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}

export async function cookieCheak(req,res,next){
    try {
            
            
        const tooken =req.cookies.jwt;
        
        
        if(!tooken){
            return res.status(401).json({message:"unauthrized-no token found "})
        }
        
        const decode =jwt.verify(tooken,process.env.JWT_key);
        if(!decode){
            return res.status(401).json({message:"unauthrized-no token found"});
        }
        const user=await userModel.findById(decode.userId);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        req.user=user;

        next()

    } catch (error) {
        console.log("error in cookieCheak",error);
        return res.status(500).json({message:"internal server error"});
    }
}