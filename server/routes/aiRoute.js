import express from "express";
import upload from "../config/multer.js";
import { analyzeJobMatch, analyzeResumeATS } from "../controllers/aiController.js";
import {isAuth, isJobSeeker} from '../middlewares/authMiddleware.js' 
import { useAiDailyCredit } from "../middlewares/aiDailyCredits.js";

const router = express.Router();

router.post(
  "/resume-analysis",
  isAuth,
  isJobSeeker,
  useAiDailyCredit("resume"),
  upload.single("resume"),
  analyzeResumeATS,
);
router.post(
  "/job-match",
  isAuth,
  isJobSeeker,
  useAiDailyCredit("jobmatch"),
  upload.single("resume"),
  analyzeJobMatch,
);

export default router;
