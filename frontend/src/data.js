import assets from "./assets/assets";

export const TOOLS = [
  {
    id: "pdf",
    title: "PDF Tools",
    items: [
      {
        name: "Merge PDF",
        href: "/pdf/merge-pdf",
        icon: assets.merge,
        desc: "Combine multiple PDF files into one organized document easily.",
      },
      {
        name: "Split PDF",
        href: "/pdf/split-pdf",
        icon: assets.split,
        desc: "Extract selected pages or split a PDF into multiple smaller files.",
      },
      {
        name: "Compress PDF",
        href: "/pdf/compress-pdf",
        icon: assets.compress,
        desc: "Reduce PDF file size while maintaining readable quality.",
      },
      {
        name: "PDF to JPEG",
        href: "/pdf/pdf-to-jpeg",
        icon: assets.convert,
        desc: "Convert PDF pages into high-quality JPEG images instantly.",
      },
      {
        name: "PDF to PNG",
        href: "/pdf/pdf-to-png",
        icon: assets.convert,
        desc: "Turn PDF pages into clear, lossless PNG images for sharing or editing.",
      },
      {
        name: "PDF to Word",
        href: "/pdf/pdf-to-word",
        icon: assets.convert,
        desc: "Easily convert PDF files into editable Word documents.",
      },
      {
        name: "Word to PDF",
        href: "/pdf/word-to-pdf",
        icon: assets.convert,
        desc: "Turn your Word documents into secure, shareable PDF files.",
      },
      {
        name: "Excel to PDF",
        href: "/pdf/excel-to-pdf",
        icon: assets.convert,
        desc: "Convert Excel spreadsheets into printable, shareable PDF format.",
      },
      {
        name: "PowerPoint to PDF",
        href: "/pdf/power-point-to-pdf",
        icon: assets.convert,
        desc: "Export your PowerPoint slides to professional-looking PDF files.",
      },
    ],
  },
  {
    id: "image",
    title: "Image Tools",
    items: [
      {
        name: "Background Remover",
        icon: assets.imgBG,
        href: "/bg-remover",
        desc: "Automatically remove or replace image backgrounds in seconds.",
      },
      {
        name: "Resize Image",
        icon: assets.resize,
        href: "/resize-image",
        desc: "Change image dimensions without losing quality or aspect ratio.",
      },
      {
        name: "Image Compressor",
        icon: assets.compress,
        href: "/compress-image",
        desc: "Reduce image file size while keeping it sharp and clear.",
      },
      {
        name: "Upscale Image",
        icon: assets.compress,
        href: "/upscale-image",
        desc: "Enhance low-resolution images using AI-powered upscaling.",
      },
      {
        name: "Convert to WebP",
        icon: assets.convert,
        href: "/to-webp",
        desc: "Convert JPG or PNG images to fast-loading WebP format.",
      },
      {
        name: "Convert to JPEG",
        icon: assets.convert,
        href: "/to-jpeg",
        desc: "Turn PNG or WebP images into standard JPEG format easily.",
      },
      {
        name: "Convert to PNG",
        icon: assets.convert,
        href: "/to-png",
        desc: "Convert JPEG or WebP images into transparent PNG format.",
      },
      {
        name: "Crop Image",
        icon: assets.cropImg,
        href: "/crop-image",
        desc: "Trim unwanted parts and focus on the best section of your image.",
      },
      {
        name: "Edit Photo",
        icon: assets.editImg,
        href: "/edit-photo",
        desc: "Adjust brightness, contrast, and filters to enhance your pictures.",
      },
      {
        name: "Rotate Image",
        icon: assets.editImg,
        href: "/rotate-photo",
        desc: "Rotate or flip images in any direction quickly and easily.",
      },
      {
        name: "Meme Generator",
        icon: assets.compress,
        href: "/meme-generate",
        desc: "Create funny and shareable memes with custom captions and images.",
      },
      {
        name: "Blur Photo",
        icon: assets.BlurImg,
        href: "/blur-photo",
        desc: "Apply smooth blur effects to highlight your image focus area.",
      },
      {
        name: "PNG to PDF",
        icon: assets.convert,
        href: "/png-to-pdf",
        desc: "Convert one or multiple PNG images into a single PDF file.",
      },
      {
        name: "JPEG to PDF",
        icon: assets.convert,
        href: "/jpeg-to-pdf",
        desc: "Transform JPEG images into downloadable and printable PDF format.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI Tools",
    items: [
      {
        name: "AI Text Summarizer",
        href: "/ai/summarizer",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "PDF Summarizer",
        href: "/ai/summarizer",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "AI PDF to Text ",
        href: "/ai/pdf-to-text",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "AI Resume Builder ",
        href: "/ai/resume-builder",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "Grammar & Spell Checker",
        href: "/ai/spell-checker",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "Blogs Idea Generator",
        href: "/ai/spell-checker",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "AI Quiz Maker",
        href: "/ai/quiz-maker",
        desc: "Summarize long text or articles into short, clear summaries using AI.",
      },
      {
        name: "Paraphraser",
        href: "/ai/paraphrase",
        desc: "Rewrite sentences with better flow and originality using AI assistance.",
      },
      {
        name: "AI Image Captioning",
        href: "/ai/image-caption",
        desc: "Generate smart and accurate captions for your images instantly.",
      },
      {
        name: "Avatar / Profile Picture Generator",
        href: "/ai/profile-pic-generater",
        desc: "Generate smart and accurate captions for your images instantly.",
      },
    ],
  },
  {
    id: "dev",
    title: "Dev Tools",
    items: [
      {
        name: "JSON Formatter & Beautifier",
        href: "/dev/json-formatter",
        desc: "Format and visualize JSON data for easier reading and debugging.",
      },
      {
        name: "JSON to CSV Converter",
        href: "/dev/json-to-csv",
        desc: "Format and visualize JSON data for easier reading and debugging.",
      },
      {
        name: "CSV to JSON Converter",
        href: "/dev/csv-json-",
        desc: "Format and visualize JSON data for easier reading and debugging.",
      },
      {
        name: "JSON to Plain Text Converter",
        href: "/dev/json-to-text",
        desc: "Format and visualize JSON data for easier reading and debugging.",
      },
      {
        name: "HTML Beautify",
        href: "/dev/html-beautify",
        desc: "Reformat and clean your messy HTML code automatically.",
      },
      {
        name: "CSS Minify",
        href: "/dev/css-minify",
        desc: "Compress CSS files to reduce load times and improve efficiency.",
      },
      {
        name: "DOM Tree Visualizer",
        href: "/dev/dom-tree",
        desc: "Compress CSS files to reduce load times and improve efficiency.",
      },
      {
        name: "CSS Gradient Generator",
        href: "/dev/css-gradient",
        desc: "Compress CSS files to reduce load times and improve efficiency.",
      },
      {
        name: "Regex Tester",
        href: "/dev/regex-tester",
        desc: "Test and validate regular expressions with instant feedback.",
      },
      {
        name: "UUID Generator",
        href: "/dev/uuid-generator",
        desc: "Test and validate regular expressions with instant feedback.",
      },
    ],
  },
];
