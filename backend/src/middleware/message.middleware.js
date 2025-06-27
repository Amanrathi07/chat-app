import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"


export async function protectedRoute(req,res,next){
     try {
            const tooken =req.cookies.jwt;
            
            
            const {text,image}=req.body;
            if (!text && !image){
                return res.status(400).json({message:"pls send a test or an image "})
            }
            if(!tooken){
                return res.status(400).json({message:"unauthrized-no token found "})
            }
    
            const decode =jwt.verify(tooken,process.env.JWT_key);
            if(!decode){
                return res.status(404).json({message:"unauthrized-no token found"});
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

export async function checkJWT(req,res,next){
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