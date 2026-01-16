import mongoose from "mongoose";
import Employer from "../models/employerModel.js";
import User from "../models/userModel.js";
import { uploadToS3 } from "../services/s3Upload.js";
import { deleteFromS3 } from "../services/s3Delete.js";
import { hashPassword } from "../helpers/bcryptHelper.js";

//api/employers/register
export const registerEmployer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      companyWebsite,
      companyDescription,
      location,
      industry,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !companyName ||
      !companyWebsite ||
      !companyDescription ||
      !location ||
      !industry
    ) {
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

    // company name should be unique
    const existingEmployer = await Employer.findOne({ companyName });
    if (existingEmployer) {
      return res
        .status(409)
        .json({ message: "Employer with this company name already exists." });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employer",
    });

    // one company per user
    const existingCompanyForUser = await Employer.findOne({ user: user._id });
    if (existingCompanyForUser) {
      return res
        .status(409)
        .json({ message: "This user already has a company created." });
    }

    let companyLogo;
    if (req.file) {
      companyLogo= await uploadToS3(req.file, "company-logos", user._id);
    }

    const employer = await Employer.create({
      user: user._id,
      companyName,
      companyWebsite,
      companyDescription,
      location,
      industry,
      companyLogo: {
        key: companyLogo?.key || "",
        url: companyLogo?.url || "",
      },
    });

    return res.status(201).json({
      message: "Employer registered successfully",
      user,
      employer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

//api/employers/update
export const updateEmployer = async (req, res) => {
  try {
    const {
      companyName,
      companyWebsite,
      companyDescription,
      location,
      industry,
    } = req.body;

    const employer = await Employer.findOne({ user: req.user._id });

    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found." });
    }

    // company name should be unique if changed
    if (companyName && companyName !== employer.companyName) {
      const existingEmployer = await Employer.findOne({ companyName });
      if (existingEmployer) {
        return res
          .status(409)
          .json({ message: "Employer with this company name already exists." });
      }
    }

    //if new logo uploaded -> upload to s3 + delete old one
    if (req.file) {
      // delete old logo if exists
      if (employer.companyLogo?.key) {
        await deleteFromS3(employer.companyLogo.key);
      }

      // upload new logo
      const newLogo = await uploadToS3(req.file, "company-logos", req.user._id);

      employer.companyLogo = {
        key: newLogo?.key || "",
        url: newLogo?.url || "",
      };
    }

    employer.companyName = companyName || employer.companyName;
    employer.companyWebsite = companyWebsite || employer.companyWebsite;
    employer.companyDescription =
      companyDescription || employer.companyDescription;
    employer.location = location || employer.location;
    employer.industry = industry || employer.industry;

    await employer.save();

    return res.status(200).json({
      message: "Employer updated successfully",
      employer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

//api/employers/me
export const getEmployer = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.user._id });

    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found." });
    }

    return res.status(200).json({
      message: "Employer profile fetched successfully",
      employer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch employer profile",
      error: error.message,
    });
  }
};


// GET  /api/employers/public/:companyId
export const getEmployerById = async (req, res) => {
  try {
    const { companyId } = req.params;

    // ✅ Check valid mongo id
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company id" });
    }

    const employer = await Employer.findById(companyId);

    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found." });
    }

    return res.status(200).json({
      message: "Employer public profile fetched successfully",
      employer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch employer public profile",
      error: error.message,
    });
  }
};


