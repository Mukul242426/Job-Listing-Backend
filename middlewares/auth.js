import jwt from "jsonwebtoken"
import {ErrorHandler} from '../utils/error.js'

export const isAuthenticated=(req,res,next)=>{
   try{
    const {jwttoken}=req.headers;
    if(!jwttoken){
        return next(ErrorHandler("Please provide a valid token",400))
    }

    const user=jwt.verify(jwttoken,process.env.SECRET_KEY);
    console.log(user)
    req.user=user
    next()

   }catch(error){
      next(ErrorHandler("You are not logged in !! Please login",400))
   }

}