import Applicant from "../models/applicantModel.js";
import Job from "../models/jobModel.js";
import JobSeeker from "../models/jobseekerModel.js";
import Employer from "../models/employerModel.js";
import { uploadToS3 } from "../services/s3Upload.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;
    const { coverLetter } = req.body;

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const job = await Job.findById(jobId).populate("employer");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Applicant.findOne({
      job: jobId,
      jobSeeker: jobSeeker._id,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You already applied for this job" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const uploadedResume = await uploadToS3(
      req.file,
      "applications-resume",
      userId
    );

    // ✅ IMPORTANT FIX
    const resumeData = {
      key: uploadedResume?.key || "",
      url: uploadedResume?.url || "",
    };

    if (!resumeData.url) {
      return res.status(500).json({ message: "Resume upload failed" });
    }

    const application = await Applicant.create({
      job: jobId,
      jobSeeker: jobSeeker._id,
      coverLetter: coverLetter || "",
      resume: resumeData, // ✅ correct format
      status: "Applied",
    });

    return res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error applying job",
      error: error.message,
    });
  }
};



export const myApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const applications = await Applicant.find({ jobSeeker: jobSeeker._id })
      .populate({
        path: "job",
        populate: { path: "employer" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      total: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching applications",
      error: error.message,
    });
  }
};


export const getEmployerApplicants = async (req, res) => {
  try {
    const userId = req.user._id;

    // ✅ employer profile
    const employer = await Employer.findOne({ user: userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    // ✅ find all jobs created by this employer
    const jobs = await Job.find({ employer: employer._id }).select("_id");

    const jobIds = jobs.map((j) => j._id);

    // ✅ find applicants for those jobs
    const applicants = await Applicant.find({ job: { $in: jobIds } })
      .populate("job")
      .populate({
        path: "jobSeeker",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      total: applicants.length,
      applicants,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching employer applicants",
      error: error.message,
    });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["Applied", "Shortlisted", "Rejected", "Hired"];

    if (!status || !allowedStatus.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed: Applied, Shortlisted, Rejected, Hired",
      });
    }

    // ✅ employer profile
    const employer = await Employer.findOne({ user: userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    // ✅ find application
    const application = await Applicant.findById(applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ check this job belongs to this employer
    if (application.job.employer.toString() !== employer._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not allowed to update this status" });
    }

    application.status = status;
    await application.save();

    const updated = await Applicant.findById(applicationId)
      .populate({
        path: "job",
        select: "title jobType location",
      })
      .populate({
        path: "jobSeeker",
        populate: { path: "user", select: "name email" },
      });

    return res.status(200).json({
      message: "Application status updated successfully",
      application: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating status",
      error: error.message,
    });
  }
};
