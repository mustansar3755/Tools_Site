import dotenv from "dotenv";
dotenv.config();

import ConvertAPI from "convertapi";
import fs from "fs";
import path from "path";
import sanitize from "sanitize-filename";

const convertapi = new ConvertAPI(process.env.CONVERT_API_KEY);

export const compressPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("PDF file is required");

    const safeName = sanitize(req.file.originalname);
    const uploadedPath = req.file.path;
    const newPath = path.join(req.file.destination, safeName);

    // Rename uploaded file
    fs.renameSync(uploadedPath, newPath);

    // Compress PDF
    const result = await convertapi.convert(
      "compress",
      { File: newPath, Preset: "web" },
      "pdf"
    );

    // --- Save compressed PDF with proper filename ---
    const compressedFilePath = path.join(
      req.file.destination,
      "compressed_" + safeName
    );

    // result.file returns the URL of single output file
    await result.files[0].save(compressedFilePath); // save single PDF

    // Send compressed PDF to client
    res.download(compressedFilePath, `compressed_${safeName}`, (err) => {
      // Cleanup
      fs.unlinkSync(newPath);              // original uploaded file
      fs.unlinkSync(compressedFilePath);   // compressed file
      if (err) console.error("Download error:", err);
    });
  } catch (err) {
    console.error("ConvertAPI Error:", err.message || err);
    res.status(500).json({ error: err.message || err });
  }
};
