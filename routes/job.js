import express from "express"
import { createJobPost, editJobPost, viewJobs,displaySkills, viewJob } from "../controllers/job.js"
import { isAuthenticated } from "../middlewares/auth.js";


const router=express.Router()

router.get('/skills',displaySkills)
router.post('/jobs',isAuthenticated,createJobPost)
router.put('/jobs/:jobId',isAuthenticated,editJobPost)
router.get('/jobs',viewJobs)
router.get('/jobs/:jobId',viewJob)


export default router;