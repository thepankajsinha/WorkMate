import upload from "../config/multer.js";

export const companyLogoUpload = upload.single("companyLogo");
export const resumeAndProfileUpload = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePicture", maxCount: 1 },
]);
export const resumeUpload = upload.single("resume");