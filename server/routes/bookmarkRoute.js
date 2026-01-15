import express from "express";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
  isBookmarked,
} from "../controllers/bookmarkController.js";

import { isAuth, isJobSeeker } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/check/:jobId", isAuth, isJobSeeker, isBookmarked);
router.post("/:jobId", isAuth, isJobSeeker, addBookmark);
router.get("/", isAuth, isJobSeeker, getBookmarks);
router.delete("/:jobId", isAuth, isJobSeeker, removeBookmark);

export default router;
