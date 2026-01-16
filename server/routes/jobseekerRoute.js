import express from "express";
import {
  getJobSeeker,
  registerJobSeeker,
  updateJobSeeker,
  getJobSeekerById,
} from "../controllers/jobseekerController.js";

import { isAuth, isJobSeeker } from "../middlewares/authMiddleware.js";
import { resumeAndProfileUpload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/register", resumeAndProfileUpload, registerJobSeeker);
router.put("/update",isAuth,isJobSeeker,resumeAndProfileUpload,updateJobSeeker);
router.get("/me", isAuth, isJobSeeker, getJobSeeker);

// Public route to get job seeker profile by jobSeekerId
router.get("/public/:jobSeekerId", getJobSeekerById);

export default router;
