import express from "express"
import { createJobPost, editJobPost, viewJobs } from "../controllers/job.js"
import { isAuthenticated } from "../middlewares/auth.js";


const router=express.Router()

router.post('/jobs',isAuthenticated,createJobPost)
router.put('/jobs/:jobId',isAuthenticated,editJobPost)
router.get('/jobs',viewJobs)

export default router;