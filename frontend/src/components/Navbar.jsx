import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "../data";
import gsap from "gsap";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const dropdownTimeout = useRef(null);

  // GSAP for Dropdown Animation
  useEffect(() => {
    if (openDropdown) {
      gsap.fromTo(
        ".dropdown-panel",
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [openDropdown]);

  useEffect(() => {
    function handler(e) {
      if (!navRef.current?.contains(e.target)) setOpenDropdown(null);
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleMouseEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
                ST
              </div>
              <span className="font-black text-xl tracking-tighter text-gray-900">
                Smart<span className="text-indigo-600">Tools</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-1">
              {TOOLS.map((cat) => (
                <div
                  key={cat.id}
                  className="relative px-2 py-4"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold transition-all ${openDropdown === cat.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {cat.title}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openDropdown === cat.id ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* 2-Column Dropdown Grid */}
                  {openDropdown === cat.id && (
                    <div className="dropdown-panel absolute left-0 mt-1 w-[450px] bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 origin-top">
                      {cat.items.map((it) => (
                        <Link
                          key={it.href}
                          to={it.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                            {/* Icon fallback */}
                            <span className="text-lg">{it.icon ? <img src={it.icon} className="w-5 h-5" alt=""/> : "🛠️"}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 group-hover:text-indigo-700">{it.name}</p>
                            <p className="text-[10px] text-gray-400 leading-tight line-clamp-1">{it.desc || "Smart utility tool"}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="search"
                placeholder="Find a tool..."
                className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm w-48 focus:w-64 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>
            <Link to="/login" className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
              Sign In
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-gray-600">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Simplified) */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t p-4 space-y-4 shadow-xl h-screen overflow-y-auto">
          {TOOLS.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">{cat.title}</h3>
              <div className="grid grid-cols-1 gap-1">
                {cat.items.map((it) => (
                  <Link key={it.href} to={it.href} className="p-3 bg-gray-50 rounded-xl text-sm font-bold flex items-center gap-3">
                    <span>🛠️</span> {it.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}