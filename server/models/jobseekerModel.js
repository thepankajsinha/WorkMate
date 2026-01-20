import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    profileImage: {
      key: String,
      url: String,
    },

    resume: {
      key: String,
      url: String,
    },

    skills: {
      type: [String],
      lowercase: true,
    },

    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
        isCurrent: { type: Boolean, default: false },
      },
    ],

    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
        isCurrent: { type: Boolean, default: false },
      },
    ],
    aiUsage: {
      resumeAnalysisCount: { type: Number, default: 1 }, // 1/day
      jobMatchCount: { type: Number, default: 1 }, // 1/day
      lastResetDate: { type: String, default: "" }, // YYYY-MM-DD
    },
  },
  { timestamps: true },
);

export default mongoose.model("JobSeeker", jobSeekerSchema);
