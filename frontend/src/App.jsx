import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";
import MergePdf from "./components/MergePdf";
import SplitPdf from "./components/SplitPdf";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdf/merge-pdf" element={<MergePdf />} />
        <Route path="/pdf/split-pdf" element={<SplitPdf />} />
        <Route path="/tools/:id" element={<CategoryPage />} />
      </Routes>
    
  );
};

export default App;
