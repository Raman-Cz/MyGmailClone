import { Email } from "../models/email.model.js";

export const createEmail = async (req,res) => {
    try{
        const userId = req.id;
        const {to,subject,message}  = req.body;
        if(!to || !subject || !message) return req.status(400).json({message:"All fields are required",success:true});

        const email = await Email.create({
            to,
            subject,
            message,
            userId
        });

        return res.status(200).json({email});
    }
    catch(err){
        console.log(err);
    }
}

export const deleteEmail = async (req,res) => {
    try{

        const emailId = req.params.id;
        if(!emailId) return res.status(400).json({message:"Email is not found"});

        const email = await Email.findByIdAndDelete(emailId);

        if(!email) return res.status(404).json({message:"Couldn't find the email"});

        return res.status(200).json({message:"Email Deleted Successfully"});

    }
    catch(err){
        console.log(err);
    }
}

export const getAllEmailById = async(req,res) => {
    try{

        const userId = req.id;

        const emails = await Email.find({userId});

        return res.status(200).json({emails});

    }
    catch(err){
        console.log(err);
    }
}