import {v2 as cloudinary} from "cloudinary"
cloudinary.config({
    cloud_name:process.env.CLOUDINAY_CLOUD_NAME,
    api_key:process.env.CLOUDINAY_API_KEY,
    api_secret:CLOUDINAY_API_SECRET
})
export default cloudinary;