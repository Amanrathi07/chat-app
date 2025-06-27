import { userModel } from "../models/user.model.js";
import  messageModel  from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReseverSocketId ,io} from "../utils/sodket.js";

export async function addUserForSideBar(req, res) {
  try {
        
    const myId = req.user._id;
    const allUser = await userModel.find({ _id: { $ne: myId } });
        
    res.status(202).json(allUser);
  } catch (error) {
    console.log("error in addUserForSideBar", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function getMessage(req, res) {
  try {
    const { id: friendId } = req.params;
    const myId = req.user._id;    
    
    const allMessage = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: friendId },
        { senderId: friendId, receiverId: myId },
      ],
    });
    
    
    res.status(200).json({allMessage});
  } catch (error) {
    console.log("error in getMessage", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

 export async function sendMessage(req, res) {
  try {
    const { id: friendId } = req.params;
    const { text, image } = req.body;
    const myId = req.user._id;

    let imageUrl = '';
    if (image) {
      const responseImage = await cloudinary.uploader.upload(image);
      imageUrl = responseImage.secure_url;
    }

    const newMessage = new messageModel({
      senderId: myId,
      receiverId: friendId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // realtime chat logic 
    const reseverSocketId =getReseverSocketId(friendId);
      if(reseverSocketId){
        
        io.to(reseverSocketId).emit("newMessage",newMessage)
      }

    res.status(201).json({
      message: 'Message sent',
      currentMessage: newMessage,
    });

  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
