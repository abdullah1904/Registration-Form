import { Request, Response } from "express";
import {hashSync, genSaltSync, compareSync} from "bcrypt"
import User from "../models/user.model";
import { generateToken } from "../utils";

const Signup = async (req:Request, res:Response)=>{
    try{
        const {name,email,password,phone,age} = req.body;
        if(!name || !email || !password || !phone || !age){
            return res.status(400).json({"message": "Please enter all fields"});
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({"message": "User already exists with this email"});
        }
        const newUser = await User.create({
            name,
            email,
            password: hashSync(password,genSaltSync(10)),
            phone,
            age
        });
        return res.status(201).json({
            message: "Signup Successfully",
            user: newUser,
            token: generateToken({id: newUser._id.toString(),email: newUser.email})
        });
    }
    catch(error){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

const Login = async (req:Request, res:Response)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({"message": "Please enter all fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({"message": "User does not exist with this email"});
        }
        if(!compareSync(password, user.password)){
            return res.status(400).json({"message": "Incorrect password"});
        }
        return res.status(200).json({
            message: "Login Successful",
            user: user,
            token: generateToken({id: user._id.toString(),email: user.email})
        });
    }
    catch(error){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export {Signup, Login}