import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },
    coverLetter: String,
    resume: String,
  },
  { timestamps: true }
);

// Prevent same job applied twice by same jobseeker
applicantSchema.index({ job: 1, jobSeeker: 1 }, { unique: true });

export default mongoose.model("Applicant", applicantSchema);
