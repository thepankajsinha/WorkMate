import express from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  getEmployerJobs,
  toggleJobStatus,
} from "../controllers/jobController.js";

import { isAuth, isEmployer } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Public routes
router.get("/", getAllJobs);

// ✅ Employer protected routes (KEEP BEFORE /:jobId)
router.post("/create", isAuth, isEmployer, createJob);
router.put("/update/:jobId", isAuth, isEmployer, updateJob);
router.delete("/delete/:jobId", isAuth, isEmployer, deleteJob);
router.get("/employer/my-jobs", isAuth, isEmployer, getEmployerJobs);
router.patch("/toggle/:jobId", isAuth, isEmployer, toggleJobStatus);

// ✅ Single job route always LAST
router.get("/:jobId", getSingleJob);

export default router;
