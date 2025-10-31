import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import Navbar from "./Navbar";

export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [pageInput, setPageInput] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState(null);
  const [outputUrl, setOutputUrl] = useState(null);
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
      setOutputUrl(null);
    } else {
      setError("Please select a valid PDF file.");
      setFile(null);
    }
  }

  async function splitPdf() {
    if (!file) {
      setError("Please select a PDF file to split.");
      return;
    }

    if (!pageInput.trim()) {
      setError("Please enter page numbers or range (e.g., 1-3 or 2,5,7).");
      return;
    }

    setSplitting(true);
    setError(null);
    setOutputUrl(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      // Parse user input
      const pagesToExtract = [];
      const parts = pageInput.split(",");
      for (let part of parts) {
        part = part.trim();
        if (part.includes("-")) {
          const [start, end] = part.split("-").map(n => parseInt(n));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) pagesToExtract.push(i - 1);
            }
          }
        } else {
          const num = parseInt(part);
          if (!isNaN(num) && num >= 1 && num <= totalPages) pagesToExtract.push(num - 1);
        }
      }

      if (pagesToExtract.length === 0) {
        setError("Invalid page numbers or range.");
        setSplitting(false);
        return;
      }

      // Create new PDF
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);

    } catch (err) {
      console.error(err);
      setError("Error splitting PDF: " + (err.message || err));
    } finally {
      setSplitting(false);
    }
  }

  function clearAll() {
    setFile(null);
    setPageInput("");
    setOutputUrl(null);
    setError(null);
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">✂️ Split PDF</h2>

        {/* File Upload */}
        <div
          className="border-2 border-dashed border-gray-400 hover:border-blue-500 transition rounded-lg p-8 text-center cursor-pointer mb-4 bg-gray-50 hover:bg-gray-100"
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          <p className="mb-2 text-gray-700 font-medium">
            Click to upload a PDF file
          </p>
          <p className="text-sm text-gray-500">
            Only one file can be uploaded at a time.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <div className="mb-4 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
            <div className="font-medium text-gray-800">{file.name}</div>
            <div className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        )}

        {/* Page Input */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Enter Page Numbers or Range:
          </label>
          <input
            type="text"
            value={pageInput}
            onChange={e => setPageInput(e.target.value)}
            placeholder="Example: 1-3 or 2,5,7"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={splitPdf}
            disabled={splitting || !file}
            className={`px-4 py-2 rounded-lg shadow text-white transition text-xl cursor-pointer ${
              splitting || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {splitting ? "Splitting..." : "Split PDF"}
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-lg border border-red-600 text-xl cursor-pointer hover:bg-red-100 transition"
          >
            Clear All
          </button>

          {outputUrl && (
            <>
              <a
                href={outputUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border text-xl cursor-pointer border-blue-500 text-blue-600 hover:bg-blue-50 transition"
              >
                Preview Split PDF
              </a>
              <a
                href={outputUrl}
                download="split.pdf"
                className="px-4 py-2 rounded-lg bg-orange-600 text-xl cursor-pointer text-white hover:bg-orange-700 transition shadow"
              >
                 Download Split File
              </a>
            </>
          )}
        </div>

        <div className="text-sm text-gray-600 text-center">
          💡 Tip: Enter page numbers like <b>1-3</b> to extract a range or <b>2,5,7</b> for selected pages.  
          All processing happens locally in your browser.
        </div>
      </div>
    </>
  );
}
