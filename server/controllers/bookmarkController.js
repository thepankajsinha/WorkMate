import Bookmark from "../models/bookmarkModel.js";
import JobSeeker from "../models/jobseekerModel.js";
import Job from "../models/jobModel.js";


//api/bookmarks/:jobId
export const addBookmark = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user._id;

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const already = await Bookmark.findOne({
      jobSeeker: jobSeeker._id,
      job: jobId,
    });

    if (already) {
      return res.status(400).json({ message: "Job already bookmarked" });
    }

    const bookmark = await Bookmark.create({
      jobSeeker: jobSeeker._id,
      job: jobId,
    });

    res.status(201).json({
      message: "Job bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error bookmarking job",
      error: error.message,
    });
  }
};

//api/bookmarks/
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const bookmarks = await Bookmark.find({ jobSeeker: jobSeeker._id })
      .populate({
        path: "job",
        populate: { path: "employer"},
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookmarks",
      error: error.message,
    });
  }
};

//api/bookmarks/:jobId
export const removeBookmark = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user._id;

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const deleted = await Bookmark.findOneAndDelete({
      job: jobId,
      jobSeeker: jobSeeker._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing bookmark",
      error: error.message,
    });
  }
};

//api/bookmarks/check/:jobId
export const isBookmarked = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user._id;

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const bookmarked = await Bookmark.findOne({
      jobSeeker: jobSeeker._id,
      job: jobId,
    });

    res.status(200).json({
      bookmarked: !!bookmarked,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking bookmark",
      error: error.message,
    });
  }
};
