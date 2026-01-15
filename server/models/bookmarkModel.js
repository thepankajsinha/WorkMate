import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent same job bookmarked twice by same jobseeker
bookmarkSchema.index({ jobSeeker: 1, job: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
