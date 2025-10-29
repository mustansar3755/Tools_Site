import React from "react";
import Home from "./pages/Home";
import { Route, Router, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/:id" element={<CategoryPage />} />
      </Routes>
    
  );
};

export default App;
