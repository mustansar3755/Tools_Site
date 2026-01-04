import React from 'react';

const ToolLayout = ({ title, desc, children, icon, color = "indigo" }) => {
  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-${color}-50 text-${color}-600 mb-6 shadow-sm border border-${color}-100`}>
          {icon}
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">
          {title}
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-100 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] rounded-[40px] overflow-hidden">
        <div className="p-8 md:p-16">
          {children}
        </div>
        <div className="bg-gray-50/50 py-4 text-center border-t border-gray-50">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Privacy Guaranteed • Browser-Side Processing
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;