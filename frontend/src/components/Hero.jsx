// src/components/ToolCategorySection.jsx
import React from "react";
import { Link } from "react-router-dom";
import ToolCard from "./ToolCard";

const Hero = ({ category }) => {
  const previewTools = category.items.slice(0, 8);
  console.log(previewTools); // show only first 4 tools

  return (
    <section className="mb-12 px-20 py-10">
     
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{category.title}</h2>
        <Link
          to={`/tools/${category.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Explore All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {previewTools.map((tool, index) => (
          <ToolCard
            key={index}
            icon={tool.icon}
            name={tool.name}
            desc={tool.desc}
            href={tool.href}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
