import mongoose from "mongoose"

const authSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            require:true,
        },
        email:{
            type: String,
            require:true,
            unique:true,
        },
        password:{
            type: String,
            require:true,
            select:false,
            minlength:6,
        },profilePic:{
            type:String,
            default:""
        }
        
    },{timestamps:true}    
)

export const userModel=mongoose.model("User",authSchema);