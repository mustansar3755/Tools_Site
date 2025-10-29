// src/pages/CategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { TOOLS } from "../data";
import ToolCard from "../components/ToolCard";

const CategoryPage = () => {
  const { id } = useParams(); // e.g., pdf, image, ai
  const category = TOOLS.find((cat) => cat.id === id);

  if (!category) {
    return <p className="text-center py-10">Category not found!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{category.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.items.map((tool, index) => (
          <ToolCard
            key={index}
            icon={tool.icon}
            name={tool.name}
            desc={tool.desc}
            href={tool.href}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
