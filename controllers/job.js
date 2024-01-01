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
    next(ErrorHandler("All Fields are required", 400));
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

  if (
    !companyName ||
    !logoUrl ||
    !position ||
    !monthlySalary ||
    !jobType ||
    !remote ||
    !location ||
    !description ||
    !about ||
    !skillsRequired ||
    !information
  ) {
    return next(ErrorHandler("All fields are required", 400));
  }

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
  let { position, selectedSkills } = req.query;

  if (selectedSkills) {
    selectedSkills = selectedSkills.split(",");
  }

  try {
    if (!position && !selectedSkills) {
      const jobs = await Job.find({});
      return res.json({
        success: true,
        results: jobs.length,
        jobs,
      });
    }

    const jobs = await Job.find({
      $or: [
        {
          position: position === "" ? "" : { $regex: position, $options: "i" },
        },
        { skillsRequired: { $in: selectedSkills } },
      ],
    });
    res.json({
      success: true,
      results: jobs.length,
      jobs,
    });
  } catch (error) {
    next(ErrorHandler());
  }
};

export const displaySkills = async (req, res, next) => {
  try {
    const skills = await Job.distinct("skillsRequired");
    res.status(200).json({
      length: skills.length,
      skills,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const viewJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return next(ErrorHandler("Job doesn't exist", 400));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
