import Applicant from "../models/applicantModel.js";
import Bookmark from "../models/bookmarkModel.js";
import Job from "../models/jobModel.js";
import Employer from "../models/employerModel.js";
import JobSeeker from "../models/jobseekerModel.js";
import User from "../models/userModel.js";
import connectDB from "../config/db.js";


export const clearDB = async () => {
  try {
    await connectDB();

    await Applicant.deleteMany();
    await Bookmark.deleteMany();
    await Job.deleteMany();
    await Employer.deleteMany();
    await JobSeeker.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Database cleared!");
    process.exit(0);
  } catch (error) {
    console.log("❌ Clear DB Error:", error.message);
    process.exit(1);
  }
};

clearDB();
