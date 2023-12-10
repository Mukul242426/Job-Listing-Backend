import express from "express"
import { createJobPost } from "../controllers/job.js"
import { isAuthenticated } from "../middlewares/auth.js";


const router=express.Router()

router.post('/jobs',isAuthenticated,createJobPost)

export default router;