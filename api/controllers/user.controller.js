import { redis } from "../index.js"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'




export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.user.id)
        const {password:pass,admin,...rest} = user._doc
        await redis.setex(`profile:${req.user.id}`,60,JSON.stringify(rest))
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req,res,next) => {
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser =  await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password:req.body.password,
                avatar: req.body.avatar
            }
        },{new:true})

        const {password:pass,admin,...rest} = updatedUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    } catch (error) {
        next(error)
    }
}

