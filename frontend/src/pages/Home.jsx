import React from "react";
import { Hero, Navbar } from "../components";
import { TOOLS } from "../data";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="py-10 ">
        <div className="content flex flex-col items-center ">
          <h2 className=" text-5xl  text-paraTxt font-black text-center">
            All the Tools You Need — in One Smart Place
          </h2>
          <p className=" text-lg text-paraTxt text-center mt-2 mb-4 max-w-[600px]">
            From PDFs to images, AI utilities to developer tools — everything
            you need is right here. Free, fast, and easy to use. Work smarter
            with SmartTools!
          </p>
        </div>
        {TOOLS.map((category, index) => (
          <Hero key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
