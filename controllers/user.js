import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ErrorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return next(ErrorHandler("User already exists with given email or mobile",400))
    }
    const protectedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      mobile,
      password: protectedPassword,
    });

    res.status(200).json({
      success:true,
      message:"Signup Successfull",
      recruiterName:name
    })
  } catch(error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(ErrorHandler("Invalid email or password",404))
    }
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
        return next(ErrorHandler("Invalid email or password",400))
    }
    const jwtToken=jwt.sign(user.toJSON(),process.env.SECRET_KEY,{
        expiresIn:'15m'
    })
    res.status(200).json({
        success:true,
        message:"Login Successfull",
        recruiterName:user.name,
        jwtToken
    })

  } catch (error){
    next(error)
  }
};
