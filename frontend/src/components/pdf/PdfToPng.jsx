/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import gsap from 'gsap';
import ToolLayout from './ToolLayout';

// Worker Setup for PDF.js
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfToPng = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const gridRef = useRef(null);

  useEffect(() => {
    if (images.length > 0) {
      gsap.fromTo(".png-card", 
        { opacity: 0, scale: 0.9, y: 30 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [images]);

  const convertPdfToPng = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setImages([]);
    setProgress(0);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      const imageList = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x Scale for crisp PNG quality
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        
        // PNG format extraction (No quality parameter needed as PNG is lossless)
        const imageData = canvas.toDataURL('image/png');
        imageList.push({ page: i, url: imageData });
        
        setProgress(Math.round((i / totalPages) * 100));
      }
      
      setImages(imageList);
    } catch (err) {
      console.error("Conversion Error:", err);
      alert("Failed to convert PDF to PNG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout 
      title="PDF to PNG" 
      desc="High-quality lossless image extraction. Every page becomes a crisp PNG."
      icon={<span className="text-3xl text-indigo-600">🖼️</span>}
    >
      {!images.length > 0 ? (
        <div className="relative border-2 border-dashed border-indigo-100 rounded-[40px] p-20 bg-white hover:bg-indigo-50/20 transition-all text-center group">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={convertPdfToPng} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="w-20 h-20 bg-indigo-50 rounded-[28px] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-indigo-100">
            <span className="text-4xl">{loading ? "⚙️" : "📁"}</span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tighter">
            {loading ? `Generating PNGs... ${progress}%` : "Drop PDF to Extract PNG"}
          </h3>
          <p className="text-gray-400 mt-2 font-medium">Best for high-quality graphics and logos</p>
          
          {loading && (
            <div className="mt-8 w-full max-w-xs mx-auto bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Status: Optimized</p>
              <p className="text-lg font-black text-gray-800 tracking-tight">{images.length} PNG Files Extracted</p>
            </div>
            <button 
              onClick={() => {setImages([]); setFile(null);}}
              className="px-6 py-3 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
            >
              Convert New File
            </button>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, idx) => (
              <div key={idx} className="png-card bg-white border border-gray-100 rounded-4xl overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-500">
                <div className="aspect-3/4 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-50 p-4">
                   <img src={img.url} alt="" className="w-full h-full object-contain rounded-xl drop-shadow-md" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Page {img.page}</span>
                  <a 
                    href={img.url} 
                    download={`SmartTools_Page_${img.page}.png`}
                    className="p-3 px-6 bg-indigo-600 text-white text-xs font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Save PNG
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
};

export default PdfToPng;