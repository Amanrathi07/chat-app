import {v2 as cloudinary} from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name:process.env.CLOUDNERY_CLOUD_NAME ,
    api_key:process.env.CLOUDNERY_API_KEY,
    api_secret:process.env.CLOUDNERY_SECRET
})


export default cloudinary ;

