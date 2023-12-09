import express from "express"
import { register,login } from "../controllers/user.js"
import { ErrorHandler } from "../utils/error.js"

const router=express.Router()

router.post('/signup',register)

router.post('/login',login)

router.all('*',(req,res,next)=>{
    next(ErrorHandler())
})

export default router;