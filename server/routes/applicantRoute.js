import express from "express";
import {
  applyJob,
  myApplications,
  getEmployerApplicants,
  updateApplicationStatus,
} from "../controllers/applicantController.js";

import {
  isAuth,
  isJobSeeker,
  isEmployer,
} from "../middlewares/authMiddleware.js";
import { resumeUpload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// jobseeker routes 
router.post("/apply/:jobId", isAuth, isJobSeeker, resumeUpload, applyJob);
router.get("/my-applications", isAuth, isJobSeeker, myApplications);

// employer routes
router.get("/employer/applicants", isAuth, isEmployer, getEmployerApplicants);
router.patch(
  "/status/:applicationId",
  isAuth,
  isEmployer,
  updateApplicationStatus
);

export default router;
