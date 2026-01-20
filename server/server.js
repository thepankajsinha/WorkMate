import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();

const app = express();

// import routes
import authRoute from "./routes/authRoute.js";
import jobseekerRoute from "./routes/jobseekerRoute.js";
import jobRoute from "./routes/jobRoute.js";
import employerRoute from "./routes/employerRoute.js";
import bookmarkRoute from "./routes/bookmarkRoute.js";
import applicantRoute from "./routes/applicantRoute.js";
import aiRoute from "./routes/aiRoute.js"


// Environment variables
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;


// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
  message: "Too many requests, try later.",
});
app.use(limiter);


//use routes
app.use("/api/auth", authRoute);
app.use("/api/jobseekers", jobseekerRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/employers", employerRoute);
app.use("/api/bookmarks", bookmarkRoute);
app.use("/api/applicants", applicantRoute);
app.use("/api/ai", aiRoute)


// start server and connect to DB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
