import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import gsap from 'gsap';
import ToolLayout from './ToolLayout';

const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splitResult, setSplitResult] = useState(null);
  const [range, setRange] = useState("");
  
  const containerRef = useRef(null);
  const successRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // GSAP Success State Animation
  useEffect(() => {
    if (splitResult && successRef.current) {
      gsap.fromTo(successRef.current, 
        { y: 40, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [splitResult]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setSplitResult(null);
  };

  const processSplit = async () => {
    if (!file || !range) return alert("Please select file and enter range (e.g. 1-3)");
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      // Range logic: "1-3" ko [0, 1, 2] mein convert karna
      const [start, end] = range.split('-').map(num => parseInt(num) - 1);
      const pageIndices = Array.from({length: (end - start + 1)}, (_, i) => start + i);
      
      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach(page => newPdf.addPage(page));

      const bytes = await newPdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setSplitResult(URL.createObjectURL(blob));
    } catch (err) {
      alert("Error: Check your range format (e.g., 1-5)");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout 
      title="Split PDF" 
      desc="Extract specific pages from your PDF document instantly."
      icon={<span className="text-3xl text-indigo-600">✂️</span>}
      color="indigo"
    >
      {!splitResult ? (
        <div ref={containerRef} className="space-y-8">
          {/* Enhanced File Input */}
          <div className="relative border-2 border-dashed border-indigo-100 rounded-4xl p-12 bg-indigo-50/10 hover:bg-indigo-50/40 transition-all text-center group overflow-hidden">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFile} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-indigo-50">
              <span className="text-3xl text-indigo-600">📄</span>
            </div>
            <p className="text-xl font-bold text-gray-800 tracking-tight">
              {file ? file.name : "Choose PDF to Split"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Select a single PDF file</p>
          </div>

          {/* Indigo Range Input Box */}
          <div className="bg-indigo-50/50 p-8 rounded-4l border border-indigo-50">
            <label className="block text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 text-center">
              Specify Page Range
            </label>
            <input 
              type="text" 
              placeholder="e.g. 1-3" 
              className="w-full p-5 rounded-2xl border-none shadow-sm focus:ring-4 focus:ring-indigo-100 text-center text-2xl font-black text-indigo-600 outline-none placeholder:text-indigo-200"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
            <p className="text-[10px] text-indigo-300 font-bold uppercase mt-4 text-center tracking-widest">Format: StartPage-EndPage</p>
          </div>

          {/* Action Button */}
          <button
            onClick={processSplit}
            disabled={loading || !file}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Extract Pages <span className="text-indigo-300">→</span></>
            )}
          </button>
        </div>
      ) : (
        /* Result State (Indigo Style) */
        <div ref={successRef} className="text-center py-10 px-4">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto">
              <span className="text-5xl">✓</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs animate-bounce">✨</div>
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-2">Pages Extracted!</h2>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto">Your specific pages have been isolated into a new PDF document.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <a 
              href={splitResult} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold transition-all text-center"
            >
              Preview
            </a>
            <a 
              href={splitResult} 
              download="Split_SmartTools.pdf"
              className="flex-1 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all text-center"
            >
              Download
            </a>
          </div>

          <button 
            onClick={() => {
              gsap.to(successRef.current, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
                setSplitResult(null); 
                setFile(null);
                setRange("");
              }});
            }}
            className="mt-10 text-sm font-bold text-indigo-600 hover:tracking-widest transition-all uppercase"
          >
            ← Split Another File
          </button>
        </div>
      )}
    </ToolLayout>
  );
};

export default SplitPdf;