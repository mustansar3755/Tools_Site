import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import ToolLayout from "./ToolLayout";

const CompressPdf = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // File upload
  const [loading, setLoading] = useState(false); // Compression
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [stats, setStats] = useState({ oldSize: 0, newSize: 0 });

  const successRef = useRef(null);

  useEffect(() => {
    if (compressedUrl && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, [compressedUrl]);

  // File select
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStats({ oldSize: selectedFile.size, newSize: 0 });
      setUploadProgress(0);
      setCompressedUrl(null);
    }
  };

  // Upload + compress
  const processCompress = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      // --- Upload file with progress ---
      const uploadResponse = await axios.post(
        "http://localhost:5000/api/pdf/compress-pdf",
        formData,
        {
          responseType: "blob",
          timeout: 0, // no timeout for large uploads
          maxBodyLength: Infinity, // important for large files
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      // --- File compressed (after upload) ---
      const blob = new Blob([uploadResponse.data], { type: "application/pdf" });
      setCompressedUrl(URL.createObjectURL(blob));
      setStats((prev) => ({ ...prev, newSize: blob.size }));
    } catch (err) {
      console.error(err);
      alert("Compression failed! Check backend or API key.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Bytes to MB
  const formatSize = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

  return (
    <ToolLayout
      title="Compress PDF"
      desc="Upload, compress, and download your PDF easily."
      icon={<span className="text-3xl text-indigo-600">📉</span>}
    >
      {!compressedUrl ? (
        <div className="space-y-8">
          {/* Upload Box */}
          <div className="relative border-2 border-dashed border-indigo-100 rounded-4xl p-12 bg-indigo-50/10 hover:bg-indigo-50/40 transition-all text-center group">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-indigo-50 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-indigo-600">📂</span>
            </div>
            <p className="text-xl font-bold text-gray-800 tracking-tight">
              {file ? file.name : "Select PDF to Compress"}
            </p>
            {file && (
              <p className="text-indigo-500 font-bold mt-2">
                {formatSize(file.size)}
              </p>
            )}
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-xl h-4 overflow-hidden">
              <div
                className="bg-indigo-600 h-4 transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-xs text-center mt-1">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}

          {/* Compress Button */}
          <button
            onClick={processCompress}
            disabled={!file || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all disabled:opacity-50"
          >
            {loading ? "Compressing PDF..." : "Upload & Compress PDF"}
          </button>
        </div>
      ) : (
        // Success Card
        <div ref={successRef} className="text-center py-6">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            ✓
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Compression Complete!
          </h2>

          <div className="flex items-center justify-center gap-8 my-10">
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Original
              </p>
              <p className="text-lg font-bold text-gray-500 line-through">
                {formatSize(stats.oldSize)}
              </p>
            </div>
            <div className="text-2xl text-indigo-200">→</div>
            <div className="text-center bg-indigo-50 p-4 rounded-2xl border border-indigo-100 px-8">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">
                Compressed
              </p>
              <p className="text-2xl font-black text-indigo-600">
                {formatSize(stats.newSize)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <a
              href={compressedUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              Preview
            </a>
            <a
              href={compressedUrl}
              download={`compressed_${file.name}`}
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all"
            >
              Download
            </a>
          </div>

          <button
            onClick={() => {
              setCompressedUrl(null);
              setFile(null);
              setStats({ oldSize: 0, newSize: 0 });
            }}
            className="mt-8 text-indigo-600 font-bold text-sm tracking-widest"
          >
            ← COMPRESS ANOTHER
          </button>
        </div>
      )}
    </ToolLayout>
  );
};

export default CompressPdf;
