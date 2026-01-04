import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./components/CategoryPage";
import MergePdf from "./components/pdf/MergePdf";
import SplitPdf from "./components/pdf/SplitPdf";
import MainLayout from "./layout/MainLayout";
import CompressPdf from "./components/pdf/CompressPdf";
import PdfToJpeg from "./components/pdf/PDFToJPEG";
import PdfToPng from "./components/pdf/PdfToPng";
import PdfToWord from "./components/pdf/PdfToWord";
import WordtoPDFConverter from "./components/pdf/WordToPdf";
import ExceltoPDFConverter from "./components/pdf/ExcelToPdf";
import PowerPointtoPDFConverter from "./components/pdf/PPointToPdf";
 // Hum niche ye file banayenge

const App = () => {
  return (
    <Routes>
      {/* MainLayout wo jagah hai jahan Navbar aur Footer fixed rahenge */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="pdf/merge-pdf" element={<MergePdf />} />
        <Route path="pdf/split-pdf" element={<SplitPdf />} />
        <Route path="pdf/compress-pdf" element={<CompressPdf />} />
        <Route path="pdf/pdf-to-jpeg" element={<PdfToJpeg />} />
        <Route path="pdf/pdf-to-png" element={<PdfToPng />} />
        <Route path="pdf/pdf-to-word" element={<PdfToWord />} />
        <Route path="pdf/word-to-pdf" element={<WordtoPDFConverter />} />
        <Route path="pdf/excel-to-pdf" element={<ExceltoPDFConverter />} />
        <Route path="pdf/power-point-to-pdf" element={<PowerPointtoPDFConverter />} />
        <Route path="tools/:id" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
};

export default App;