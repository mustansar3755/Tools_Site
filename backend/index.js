import dotenv from "dotenv";
dotenv.config(); // ✅ Must be first

import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import PDFRouters from "./routes/pdf.routes.js";

// Port
const port = process.env.PORT || 5000;

// __dirname fix for ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// Multer config (temporary uploads folder)
const upload = multer({
  dest: path.join(__dirname, "uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// Test API
app.get("/api", (req, res) => {
  res.send("Hello World");
});

// PDF Routes (pass multer if needed inside route)
app.use("/api/pdf", PDFRouters);

// Start server
app.listen(port, () => {
  console.log("PDF Compressor API running on port", port);
});
