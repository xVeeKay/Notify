import Note from '../models/note.model.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!email||!name||!password){
            return res.json({message:"User credentials are required!",success:false})
        }
        const existedUser=await User.findOne({email})
        if(existedUser){
            return res.json({message:"User already exists!",success:false})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.json({message:"User created successfully",success:true})
    } catch (error) {
        console.log("error while signing up", error)
        return res.json({message:"Error while signing up",success:false})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.json({message:"User does not exists",success:false})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({message:"Invalid password!",success:false})
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({token,user:{id:user._id,email:user.email,name:user.name},success:true})
    } catch (error) {
        console.log("error while login, ",error)
        res.json({message:"Error while login",success:false})
    }
}

export {
    signup,
    login,
}