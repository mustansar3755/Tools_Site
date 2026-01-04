import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">ST</div>
              <span className="font-black text-xl tracking-tighter">Smart<span className="text-indigo-600">Tools</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium, private, and 100% browser-side PDF tools. Your data never leaves your computer.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Popular Tools</h4>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/pdf/merge-pdf" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Merge PDF</Link>
              <Link to="/pdf/split-pdf" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Split PDF</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Trust & Security</h4>
            <p className="text-gray-500 text-sm">
              All processing happens locally. We don't store or see your files. Secure by design.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            © 2025 SMARTTOOLS • BUILT WITH GSAP & REACT
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-indigo-600 text-xs font-bold">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 text-xs font-bold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;