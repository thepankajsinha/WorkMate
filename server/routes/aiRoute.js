import express from "express";
import upload from "../config/multer.js";
import { analyzeJobMatch, analyzeResumeATS } from "../controllers/aiController.js";

const router = express.Router();

router.post("/resume-analysis", upload.single("resume"), analyzeResumeATS);
router.post("/job-match", upload.single("resume"), analyzeJobMatch);

export default router;
