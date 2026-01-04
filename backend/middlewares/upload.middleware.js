import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  }
});

export default upload;
