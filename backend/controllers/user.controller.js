import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    try{
        const {fullname,email,password} = req.body;

        if(!fullname || !email || !password) return res.status(400).json({message:"All fields are required",success:false});

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message:"User already exists with this email",success:false});

        const hashPassword = await bcrypt.hash(password,10);
        const profilePhoto = "https://avatar.iran.liara.run/public";
        await User.create({
            fullname,
            email,
            password:hashPassword,
            profilePhoto
        });

        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })

    }catch(err){
        console.log(err);
    }
}

export const login = async (req,res) => {
    try{

        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({message:"All fields are required",success:false});
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message:"Incorrect Password or Email",success:false});

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.status(401).json({message:"Incorrect Password or Email", success:false});

        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,  // 1 day
            httpOnly: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            message: `${user.fullname} logged in successfully`,
            user,
            success: true
        });


    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const logout = async(req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully"
        })
    }
    catch(err){
        console.log(err);
    }
}