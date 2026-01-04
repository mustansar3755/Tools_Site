import express from "express";
import { compressPdf } from "../controllers/pdf.controllers.js";
import upload from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post(
  "/compress-pdf",
  upload.single("pdf"),
  compressPdf
);

export default router;
