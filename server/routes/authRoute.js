import express from "express";
import {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser); 
router.get("/me", isAuth, getUserProfile);
router.put("/update", isAuth, updateUserProfile);

export default router;
