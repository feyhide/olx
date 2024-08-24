import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'


export const verifyToken = (req,res,next) => {
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

    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only get, update and delete your own account"))
    }

    next()
}