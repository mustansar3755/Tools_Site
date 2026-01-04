import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import gsap from 'gsap';
import ToolLayout from './ToolLayout';

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (mergedPdfUrl) {
      gsap.fromTo(successRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" });
    }
  }, [mergedPdfUrl]);

  const processMerge = async () => {
    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => mergedPdf.addPage(p));
      }
      const bytes = await mergedPdf.save();
      setMergedPdfUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    // eslint-disable-next-line no-unused-vars
    } catch (err) { alert("Error merging PDFs"); }
    setLoading(false);
  };

  return (
    <ToolLayout title="Merge PDF" desc="Combine multiple PDFs into one secure document instantly." icon={<span className="text-3xl">📑</span>}>
      {!mergedPdfUrl ? (
        <div className="space-y-8">
          <div className="group relative border-2 border-dashed border-indigo-100 rounded-4xl p-16 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-center">
            <input type="file" multiple accept=".pdf" onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])} className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
              <span className="text-white text-2xl font-bold">+</span>
            </div>
            <p className="text-xl font-bold text-gray-800">Drop PDFs here</p>
            <p className="text-gray-400 text-sm">Select 2 or more files to merge</p>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-sm font-bold text-gray-700 truncate max-w-md">{f.name}</span>
                  <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">✕</button>
                </div>
              ))}
              <button onClick={processMerge} disabled={loading || files.length < 2} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 disabled:opacity-50 transition-all">
                {loading ? "Merging..." : "Merge Files Now"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div ref={successRef} className="text-center py-8">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">✓</div>
          <h2 className="text-3xl font-black mb-10">Merged Successfully!</h2>
          <div className="flex gap-4 max-w-sm mx-auto">
            <a href={mergedPdfUrl} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold hover:bg-gray-200 transition-all">Preview</a>
            <a href={mergedPdfUrl} download="merged.pdf" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200">Download</a>
          </div>
          <button onClick={() => {setMergedPdfUrl(null); setFiles([]);}} className="mt-8 text-indigo-600 font-bold text-sm">← START NEW</button>
        </div>
      )}
    </ToolLayout>
  );
};

export default MergePdf;