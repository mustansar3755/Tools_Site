import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "./data";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const dropdownTimeout = useRef(null);

  // 🔸 Close dropdowns when clicking outside
  useEffect(() => {
    function handler(e) {
      if (!navRef.current?.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // 🧠 Hover open/close logic with delay (smooth + avoids accidental close)
  const handleMouseEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  return (
    <header className="w-full bg-gray-50/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                TS
              </div>
              <span className="font-semibold text-lg text-gray-800">ToolSet</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-6">
            {TOOLS.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(cat.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown((s) => (s === cat.id ? null : cat.id));
                  }}
                  className="px-3 py-2 rounded-md inline-flex items-center gap-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span>{cat.title}</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                {openDropdown === cat.id && (
                  <div
                    className="absolute left-0 mt-2 w-52 bg-white/90 border border-gray-200 rounded-lg shadow-lg py-2 backdrop-blur-md"
                    onMouseEnter={() => handleMouseEnter(cat.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {cat.items.map((it) => (
                      <Link
                        key={it.href}
                        to={it.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {it.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Search Bar */}
            <div className="ml-4">
              <input
                type="search"
                placeholder="Search tools..."
                className="px-3 py-2 rounded-md border w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Link
              to="/login"
              className="ml-4 px-4 py-2 rounded-md border hover:bg-gray-100 transition"
            >
              Sign in
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-gray-50">
          <div className="px-4 py-3 space-y-2">
            {TOOLS.map((cat) => (
              <details
                key={cat.id}
                className="bg-white rounded-md"
                onClick={(e) => e.stopPropagation()}
              >
                <summary className="px-3 py-2 cursor-pointer list-none font-medium">
                  {cat.title}
                </summary>
                <div className="px-2 pb-2">
                  {cat.items.map((it) => (
                    <Link
                      key={it.href}
                      to={it.href}
                      className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      {it.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}

            <div>
              <input
                type="search"
                placeholder="Search tools..."
                className="px-3 py-2 rounded-md border w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Link
              to="/login"
              className="block text-center px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
