import React, { useEffect, useRef } from "react";
import { Hero } from "../components";
import { TOOLS } from "../data";
import gsap from "gsap";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const containerRef = useRef(null);

  useEffect(() => {
    // Smooth entrance for home content
    gsap.fromTo(
      ".home-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-200">
      {/* Hero Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center home-content">
          <h1 className="text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-6">
            All the Tools You Need — <br />
            <span className="text-indigo-600">in One Smart Place</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            From PDFs to images, AI utilities to developer tools — everything
            you need is right here. Free, fast, and secure.
          </p>
          
          {/* Quick Stats/Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {['No Sign-up', '100% Private', 'Fast Processing'].map((badge) => (
              <span key={badge} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto mt-20 space-y-24 home-content">
          {TOOLS.map((category, index) => (
            <div key={index} className="tool-category-wrapper">
               <Hero category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;