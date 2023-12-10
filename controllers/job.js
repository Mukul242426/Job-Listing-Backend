import { Job } from "../models/job.js"

export const createJobPost = async (req, res, next) => {
  const {
    companyName,
    logoUrl,
    position,
    monthlySalary,
    jobType,
    remote,
    location,
    description,
    about,
    skillsRequired,
    information,
  } = req.body;


  try {
    await Job.create({
      companyName,
      recruiterName:req.user.name,
      logoUrl,
      position,
      monthlySalary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired,
      information,
    });
    res.status(200).json({
        success:true,
        message:"Job Post created successfully"
    })
  } catch (error) {
    next(error)
  }
};
