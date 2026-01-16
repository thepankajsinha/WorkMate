import User from "../models/userModel.js";
import JobSeeker from "../models/jobseekerModel.js";
import { uploadToS3 } from "../services/s3Upload.js";
import { deleteFromS3 } from "../services/s3Delete.js";
import { hashPassword } from "../helpers/bcryptHelper.js";

//api/jobseekers/register
export const registerJobSeeker = async (req, res) => {
  try {
    let { name, email, password, bio, skills, education, experience } =
      req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exist. Please Login." });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "jobseeker",
    });


    if (typeof skills === "string") {
      skills = skills
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }


    // if education or experience are sent as strings, parse them into objects
    if (typeof education === "string") {
      try {
        education = JSON.parse(education); //converts string to array of objects
      } catch (err) {
        education = [];
      }
    }

    if (typeof experience === "string") {
      try {
        experience = JSON.parse(experience); //converts string to array of objects
      } catch (err) {
        experience = [];
      }
    }


    // ensure education and experience are arrays
    if (!Array.isArray(education)) education = [];
    if (!Array.isArray(experience)) experience = [];


    let resumeData = { key: "", url: "" };
    let profilePicData = { key: "", url: "" };

    if (req.files?.resume?.[0]) {
      const uploadedResume = await uploadToS3(
        req.files.resume[0],
        "jobseeker-resume",
        user._id
      );

      resumeData = {
        key: uploadedResume?.key || "",
        url: uploadedResume?.url || "",
      };
    }

    if (req.files?.profilePicture?.[0]) {
      const uploadedProfile = await uploadToS3(
        req.files.profilePicture[0],
        "jobseeker-profile",
        user._id
      );

      profilePicData = {
        key: uploadedProfile?.key || "",
        url: uploadedProfile?.url || "",
      };
    }

    const jobSeeker = await JobSeeker.create({
      user: user._id,
      bio: bio || "",
      skills : skills || [],
      education,
      experience,
      resume: resumeData,
      profileImage: profilePicData,
    });

    return res.status(201).json({
      message: "JobSeeker registered successfully",
      user,
      jobSeeker,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

//api/jobseekers/update
export const updateJobSeeker = async (req, res) => {
  try {
    const userId = req.user._id;

    let { bio, skills, education, experience } = req.body;

    const jobSeeker = await JobSeeker.findOne({ user: userId });

    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    if (bio !== undefined) {
      jobSeeker.bio = bio;
    }

    // convert skills (string -> array)
    if (skills !== undefined) {
      if (typeof skills === "string") {
        jobSeeker.skills = skills
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
      } else if (Array.isArray(skills)) {
        jobSeeker.skills = skills
          .map((s) => String(s).trim().toLowerCase())
          .filter(Boolean);
      }
    }

    if (education !== undefined) {
      if (typeof education === "string") {
        try {
          education = JSON.parse(education);
        } catch (err) {
          education = [];
        }
      }

      if (Array.isArray(education)) {
        jobSeeker.education = education;
      }
    }

    // convert experience (string -> array)
    if (experience !== undefined) {
      if (typeof experience === "string") {
        try {
          experience = JSON.parse(experience);
        } catch (err) {
          experience = [];
        }
      }

      if (Array.isArray(experience)) {
        jobSeeker.experience = experience;
      }
    }

    // upload resume
    if (req.files?.resume?.[0]) {
      // delete old resume if exists
      if (jobSeeker.resume?.key) {
        await deleteFromS3(jobSeeker.resume.key);
      }

      // upload new resume
      const uploadedResume = await uploadToS3(
        req.files.resume[0],
        "jobseeker-resume",
        userId
      );

      jobSeeker.resume = {
        key: uploadedResume?.key || "",
        url: uploadedResume?.url || "",
      };
    }

    //upload profile picture
    if (req.files?.profilePicture?.[0]) {
      // delete old profile image if exists
      if (jobSeeker.profileImage?.key) {
        await deleteFromS3(jobSeeker.profileImage.key);
      }

      // upload new profile image
      const uploadedProfile = await uploadToS3(
        req.files.profilePicture[0],
        "jobseeker-profile",
        userId
      );

      jobSeeker.profileImage = {
        key: uploadedProfile?.key || "",
        url: uploadedProfile?.url || "",
      };
    }

    await jobSeeker.save();

    const updatedJobSeeker = await JobSeeker.findOne({ user: userId });

    return res.status(200).json({
      message: "Profile updated successfully",
      jobSeeker: updatedJobSeeker,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};


//api/jobseekers/me
export const getJobSeeker = async (req, res) => {
  try {

    const jobSeeker = await JobSeeker.findOne({ user: req.user._id }).populate("user");

    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    return res.status(200).json({
      message: "JobSeeker profile fetched successfully",
      jobSeeker,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};
