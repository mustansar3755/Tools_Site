import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Dynamic Content Area */}
      <main className="grow">
        <Outlet /> 
        {/* Outlet ki jagah par aapke pages (Merge, Split etc) render honge */}
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;