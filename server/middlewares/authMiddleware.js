import { verifyToken } from "../helpers/jwtHelper.js";
import User from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated, please login" });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found, authentication failed" });
    }
    
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export const isJobSeeker = (req, res, next) => {
  if (req.user && req.user.role === "jobseeker") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Job seeker only." });
  }
};

export const isEmployer = (req, res, next) => {
  if (req.user && req.user.role === "employer") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Employer only." });
  }
};
