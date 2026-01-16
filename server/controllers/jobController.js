import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import Employer from "../models/employerModel.js";
import Applicant from "../models/applicantModel.js"


export const createJob = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.user._id });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    let {
      title,
      description,
      requirements,
      responsibilities,
      skills,
      jobType,
      location,
      salary,
      experience,
      openings,
      isActive,
    } = req.body;

    if(!title || !description || !requirements || !responsibilities || !skills || !jobType || !location || !salary || !experience || openings === undefined || isActive === undefined){
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    if(typeof skills === "string"){
      skills = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    }else if(Array.isArray(skills)){
      skills = skills.map((s) => String(s).trim().toLowerCase()).filter(Boolean);
    }

    if (typeof requirements === "string") {
      requirements = requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }

    if (typeof responsibilities === "string") {
      responsibilities = responsibilities
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }

    const newJob = await Job.create({
      employer: employer._id,
      title,
      description,
      requirements,
      responsibilities,
      skills,
      jobType,
      location,
      salary,
      experience,
      openings: Number(openings),
      isActive: isActive,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  }catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      message: "Error creating job",
      error: error.message,
    });
  }
};


export const updateJob = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.user._id });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const { jobId } = req.params;

    let {
      title,
      description,
      requirements,
      responsibilities,
      skills,
      jobType,
      location,
      salary,
      experience,
      openings,
      isActive,
    } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== employer._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this job" });
    }

    if (
      !title ||
      !description ||
      !requirements ||
      !responsibilities ||
      !skills ||
      !jobType ||
      !location ||
      !salary ||
      !experience ||
      openings === undefined ||
      isActive === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    if (typeof skills === "string") {
      skills = skills
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    } else if (Array.isArray(skills)) {
      skills = skills
        .map((s) => String(s).trim().toLowerCase())
        .filter(Boolean);
    }

    if (typeof requirements === "string") {
      requirements = requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    } else if (Array.isArray(requirements)) {
      requirements = requirements.map((r) => String(r).trim()).filter(Boolean);
    }

    if (typeof responsibilities === "string") {
      responsibilities = responsibilities
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    } else if (Array.isArray(responsibilities)) {
      responsibilities = responsibilities
        .map((r) => String(r).trim())
        .filter(Boolean);
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements,
        responsibilities,
        skills,
        jobType,
        location,
        salary,
        experience,
        openings: Number(openings),
        isActive,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      message: "Error updating job",
      error: error.message,
    });
  }
};



export const deleteJob = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.user._id });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, employer: employer._id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.deleteOne({ _id: jobId });

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      message: "Error deleting job",
      error: error.message,
    });
  }
};


export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate("employer").sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Jobs fetched successfully",
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};


export const getSingleJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate("employer");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicants = await Applicant.countDocuments({ job: job._id });

    return res.status(200).json({
      message: "Job fetched successfully",
      job: {
        ...job.toObject(),
        applicants, // ✅ send this
      },
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({
      message: "Error fetching job",
      error: error.message,
    });
  }
};


export const getEmployerJobs = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.user._id });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const jobs = await Job.find({ employer: employer._id }).populate("employer").sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Employer jobs fetched successfully",
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    return res.status(500).json({
      message: "Error fetching employer jobs",
      error: error.message,
    });
  }
};


export const getJobsByEmployerId = async (req, res) => {
  try {
    const { employerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: "Invalid employerId" });
    }

    const jobs = await Job.find({ employer: employerId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Employer jobs fetched successfully",
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch employer jobs",
      error: error.message,
    });
  }
};



export const toggleJobStatus = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.user._id });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, employer: employer._id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.isActive = !job.isActive;
    await job.save();

    return res.status(200).json({
      message: `Job status updated successfully`,
      job,
    });
  } catch (error) {
    console.error("Error toggling job status:", error);
    return res.status(500).json({
      message: "Error toggling job status",
      error: error.message,
    });
  }
};
