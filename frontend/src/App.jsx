import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";
import MergePdf from "./components/MergePdf";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merge-pdf" element={<MergePdf />} />
        <Route path="/tools/:id" element={<CategoryPage />} />
      </Routes>
    
  );
};

export default App;
