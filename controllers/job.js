import { Job } from "../models/job.js";
import { ErrorHandler } from "../utils/error.js";

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
      recruiterName: req.user.name,
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
      success: true,
      message: "Job Post created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editJobPost = async (req, res, next) => {
  const { jobId } = req.params;
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
    await Job.findByIdAndUpdate(jobId, {
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
    });
    res.json({
      success: true,
      message: "Job Post edited successfully",
    });
  } catch (error) {
    next(ErrorHandler());
  }
};

export const viewJobs = async (req, res, next) => {
  let { position, skills } = req.query;

  if (skills) {
    skills = skills.split(",");
  }

  try {
    if (!position && !skills) {
      const jobs = await Job.find({});
      return res.json({
        success: true,
        results:jobs.length,
        jobs
      });
    }

    const jobs = await Job.find({
      $or: [{ position }, { skillsRequired: { $in: skills } }],
    });
    res.json({
      success: true,
      results: jobs.length,
      jobs,
    });
  } catch (error) {
    next(ErrorHandler())
  }
};
