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
import {isAuth, isEmployer} from "../middlewares/authMiddleware.js";


const router = express.Router();

// public
router.get("/", getAllJobs);
router.get("/:jobId", getSingleJob);

// employer protected
router.post("/create", isAuth, isEmployer, createJob);
router.put("/update/:jobId", isAuth, isEmployer, updateJob);
router.delete("/delete/:jobId", isAuth, isEmployer, deleteJob);
router.get("/employer/my-jobs", isAuth, isEmployer, getEmployerJobs);
router.patch("/toggle/:jobId", isAuth, isEmployer, toggleJobStatus);
export default router;
 