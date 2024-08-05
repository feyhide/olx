import User from "../models/user.model.js";
import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'


export const verifyAdmin = async (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,"Unauthorized"))
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(403,"forbidden"))
        }

        req.user = user;

    })
    
    const accessingUser = await User.findById(req.user.id)
    if(!accessingUser.admin){
        return next(errorHandler(404,"page not found"))
    }

    next()
}