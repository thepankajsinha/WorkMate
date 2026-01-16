import express from "express";
import { isAuth, isEmployer } from "../middlewares/authMiddleware.js";
import {
  registerEmployer,
  updateEmployer,
  getEmployer,
  getEmployerById,
} from "../controllers/employerController.js";

import { companyLogoUpload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/register", companyLogoUpload, registerEmployer);
router.put("/update", isAuth, isEmployer, companyLogoUpload, updateEmployer);
router.get("/me", isAuth, isEmployer, getEmployer);

// Public route to get employer profile by companyId
router.get("/public/:companyId", getEmployerById);

export default router;
