import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return next(ErrorHandler("All Fields are required", 400));
    }

    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return next(ErrorHandler("User already exists", 400));
    }
    const protectedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      mobile,
      password: protectedPassword,
    });
    const jwtToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Signup Successfull",
      recruiterName: name,
      jwtToken,
    });
  } catch (error) {
    next(ErrorHandler("All Fields are required", 400));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(ErrorHandler("All Fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(ErrorHandler("Invalid email or password", 400));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(ErrorHandler("Invalid email or password", 400));
    }
    const jwtToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      recruiterName: user.name,
      jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
