import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

//controller to signup a user
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.status(400).json({
        success: false,
        message: "Missing required details",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//controller to login a user
export const login=async(req,res)=>{
  try {
    const {email,password}=req.body
    const userData=await User.findOne({email})

    const isPasswordCorrect=await bcrypt.compare(password,userData.password)
    if(!isPasswordCorrect)
    {
      return res.json({success:false,message:"Invalid credentials"});
    }
    const token=generateToken(userData._id)
    res.json({success:true,userData,token,message:"Login Successful!!"})


  } catch (error) {
     console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

//controller to check if user is authenticated

export const checkAuth=(req,res)=>{
  res.json({success:true,user:req.user})
}