// MergePdf.jsx
import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import Navbar from "./Navbar";

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState(null);
  const [outputUrl, setOutputUrl] = useState(null);
  const inputRef = useRef(null);

  // Handle files from input or drop
  function handleFiles(selectedFiles) {
    setError(null);
    const arr = Array.from(selectedFiles).filter(f => f.type === "application/pdf");
    if (arr.length !== selectedFiles.length) {
      setError("Some files were ignored because they are not PDFs.");
    }
    setFiles(prev => [...prev, ...arr]);
  }

  function handleInputChange(e) {
    handleFiles(e.target.files);
    e.target.value = null;
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  async function mergePdf() {
    if (files.length === 0) {
      setError("Please add at least one PDF file.");
      return;
    }
    setMerging(true);
    setError(null);
    setOutputUrl(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);

    } catch (err) {
      console.error(err);
      setError("Error merging PDFs: " + (err.message || err));
    } finally {
      setMerging(false);
    }
  }

  function clearAll() {
    setFiles([]);
    setError(null);
    setOutputUrl(null);
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">🧩 PDF Merger</h2>

        {/* Drop Zone */}
        <div
          className="border-2 border-dashed border-gray-400 hover:border-blue-500 transition rounded-lg p-8 text-center cursor-pointer mb-4 bg-gray-50 hover:bg-gray-100"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          <p className="mb-2 text-gray-700 font-medium">
            Drag & drop PDF files here, or click to select
          </p>
          <p className="text-sm text-gray-500">
            Files will be merged in the order they appear below.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">
              Selected Files ({files.length})
            </h3>
            <ul className="space-y-2">
              {files.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-white shadow-sm p-3 rounded-lg border border-gray-200"
                >
                  <div>
                    <div className="font-medium text-gray-800">{f.name}</div>
                    <div className="text-xs text-gray-500">
                      {(f.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium  cursor-pointer "
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => inputRef.current && inputRef.current.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-xl cursor-pointer transition"
          >
            + Add PDF
          </button>

          <button
            onClick={mergePdf}
            disabled={merging || files.length === 0}
            className={`px-4 py-2 rounded-lg shadow text-white transition text-xl cursor-pointer ${
              merging || files.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {merging ? "Merging..." : "Merge PDFs"}
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-lg border text-xl cursor-pointer border-red-600 hover:bg-red-100 transition"
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
                Preview Merged PDF
              </a>
              <a
                href={outputUrl}
                download="merged.pdf"
                className="px-4 py-2 rounded-lg bg-orange-600 text-xl cursor-pointer text-white hover:bg-orange-700 transition shadow"
              >
                ⬇️ Download Merged File
              </a>
            </>
          )}
        </div>

        <div className="text-sm text-gray-600 text-center">
          💡 Tip: You can reorder files manually by removing and re-adding them
          in your desired order. All processing happens locally in your browser.
        </div>
      </div>
    </>
  );
}
