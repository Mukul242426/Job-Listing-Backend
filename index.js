import express from "express"
import userRouter from './routes/user.js'
import jobRouter from './routes/job.js'
import mongoose from "mongoose"
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js"
import { ErrorHandler } from "./utils/error.js"
import cors from "cors"

const app=express()
app.use(cors())


dotenv.config()

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// routes

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Everything's fine"    
    })
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is up and running"
    })
})

app.use(userRouter)
app.use(jobRouter)
app.all('*',(req,res,next)=>{
    next(ErrorHandler())
})

app.use(errorMiddleware)

// database connection

app.listen(process.env.PORT,()=>{
    mongoose
    .connect(process.env.MONGODB_URL,{
        dbName:'userDetails'
    })
    .then(()=>console.log(`Server running successfully on http://localhost:${process.env.PORT}`))
    .catch(()=>console.log(error))
})