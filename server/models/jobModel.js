import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [
      { type: String, required: true }
    ],
    responsibilities: [
      { type: String, required: true }
    ],
    skills: [{
      type: String,
      lowercase: true,
      required: true
    }],
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    postedOn: {
      type: Date,
      default: Date.now,
    },
    openings: {
      type: Number,
      required: true,
      default: 1,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
