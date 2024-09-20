import { Request, Response } from "express";
import User from "../models/user.model";

const GetUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.token.id);
        if(!user){
            return res.status(404).json({"message": "User not found"});
        }
        return res.status(200).json({"message": "OK", user});
    }
    catch(error){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

const UpdateUser = async (req: Request, res: Response) => {
    try{
        const {name,phone,age} = req.body;
        if(!name || !phone || !age){
            return res.status(400).json({"message": "Please enter all fields"});
        }
        const updatedUser = await User.findOneAndUpdate({_id: req.token.id},{name,phone,age},{new: true});
        if(!updatedUser){
            return res.status(404).json({"message": "User not found"});
        }
        return res.status(200).json({"message": "OK", updatedUser});
    }
    catch(error){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export {GetUser, UpdateUser};