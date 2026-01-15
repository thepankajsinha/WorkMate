import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    companyLogo: {
      key : String,
      url : String
    },
    companyWebsite: {
      type: String,
    },
    companyDescription: {
      type: String
    },
    location: {
      type: String
    },
    industry: {
      type: String
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employer", employerSchema);
