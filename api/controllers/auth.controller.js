import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const {email, password } = req.body;
    if (email === undefined || password === undefined) {
        return next(errorHandler(500, "Only completed form is accepted"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        const {password:pass,admin, ...rest} = newUser._doc
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest)
    
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(401,"Invalid Credentials"))
        }

        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,admin, ...rest} = validUser._doc
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest)
        
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req,res,next) => {
    try {
        res.clearCookie("access_token")
        res.status(200).json({
            success: true,
            message: "User signed out"
        })
    } catch (error) {
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    const {id} = req.body;
    try {
        const user = await User.findOne({id});
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        
        if(user.admin){
            return res.status(200).json({
                message:true
            })
        }

        return next(errorHandler(400,false))
        
    } catch (error) {
        next(error);
    }
};