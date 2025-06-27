import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/user.utils.js";
import cloudinary from "../utils/cloudinary.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await new userModel({
      name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      const user = newUser.save();
      return res.status(200).json({
        message: "signup sessusful",
        _id: user._id,
        name: user.name,
        profilePic: user.profilePic,
      });
    } else {
      return res.status(400).json({ message: "signup un-successfully" });
    }
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).json({ message: "Internal server errot" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "invalied credintials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      generateToken(user._id, res);
      return res
        .status(200)
        .json({
          message: "login sessusful",
          _id: user._id,
          name: user.name,
          profilePic: user.profilePic,
        });
    } else {
      return res.status(400).json({ message: "invalied credintials" });
    }
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export function logout(req, res) {
  try {
        
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout succesfully" });
  } catch (error) {
    console.log("error in logout ", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, password, email, profilePic } = req.body;


    if (profilePic) {
      const responseImage = await cloudinary.uploader.upload(profilePic);
      const updateUser = await userModel.findByIdAndUpdate(
        req.user._id,
        { name, password, profilePic: responseImage.secure_url },
        { new: true }
      );
    } else {
      const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
        name,
        password,
      },{new:true});
    }

    return res.status(200).json({ message: "update successfully" });
  } catch (error) {
    console.log("error in update", error);
    return res.status(500).json({ message: "internal server error" });
  }
}


export function checkAuth(req,res){
  try {
    res.status(200).json({message:"user is alrady authentratic",...req.user._doc})
  } catch (error) {
   console.log("check in update", error);
    return res.status(500).json({ message: "internal server error" });
  }
}