import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const { fieldname, mimetype } = file;

  if (fieldname === "profilePicture" || fieldname === "companyLogo") {
    if (!mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    return cb(null, true);
  }

  if (fieldname === "resume") {
    const allowed = ["application/pdf", "application/octet-stream"];
    if (!allowed.includes(mimetype)) {
      return cb(new Error("Only PDF resumes allowed"), false);
    }
    return cb(null, true);
  }

  // Invalid field
  cb(new Error(`Invalid upload field: ${file.fieldname}`), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

export default upload;
