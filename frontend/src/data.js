import assets from "./assets/assets";

export const TOOLS = [
  {
    id: "pdf",
    title: "PDF Tools",
    items: [
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        icon: assets.merge,
        desc: "Combine multiple PDF files into one organized document quickly.",
      },
      {
        name: "Split PDF",
        href: "/split-pdf",
        icon: assets.split,
        desc: "Separate one PDF into multiple smaller files with ease.",
      },
      {
        name: "Compress PDF",
        href: "/compress-pdf",
        icon: assets.compress,
        desc: "Reduce PDF file size without losing quality or clarity.",
      },
      {
        name: "PDF to Jpeg",
        href: "/pdf-to-jpeg",
        icon: assets.convert,
        desc: "Easily convert your PDF files into editable Word documents in seconds.",
      },
      {
        name: "PDF to PNG",
        href: "/pdf-to-png",
        icon: assets.convert,
        desc: "Easily convert your PDF files into editable Word documents in seconds.",
      },
      {
        name: "PDF to Word",
        href: "/pdf-to-word",
        icon: assets.convert,
        desc: "Easily convert your PDF files into editable Word documents in seconds.",
      },
      {
        name: "Word to PDF",
        href: "/word-to-pdf",
        icon: assets.convert,
        desc: "Turn your Word documents into professional PDF files instantly.",
      },
      {
        name: "Excel to PDF",
        href: "/excel-to-pdf",
        icon: assets.convert,
        desc: "Turn your Word documents into professional PDF files instantly.",
      },
      {
        name: "PowerPoint to PDF",
        href: "/power-point-to-pdf",
        icon: assets.convert,
        desc: "Turn your Word documents into professional PDF files instantly.",
      },
    ],
  },
  {
    id: "image",
    title: "Image Tools",
    items: [
      {
        name: "Background Remover",
        icon:assets.imgBG,
        href: "/bg-remover",
        desc: "Automatically remove the background from any image in one click.",
      },
      {
        name: "Resize Image",
        icon:assets.resize,
        href: "/resize-image",
        desc: "Adjust image dimensions to fit your design or upload needs easily.",
      },
      {
        name: "Image Compressor",
        icon: assets.compress,        
        href: "/compress-image",
        desc: "Shrink image file sizes while keeping high visual quality.",
      },
      {
        name: "Convert to WebP",
        icon: assets.convert,
        href: "/to-webp",
        desc: "Convert JPG or PNG images to modern, lightweight WebP format.",
      },
      {
        name: "Convert to jpeg",
        icon: assets.convert,
        href: "/to-jpeg",
        desc: "Convert JPG or PNG images to modern, lightweight WebP format.",
      },
      {
        name: "Convert to PNG",
        icon: assets.convert,
        href: "/to-png",
        desc: "Convert JPG or PNG images to modern, lightweight WebP format.",
      },
      {
        name: "Convert to PNG",
        icon: assets.convert,
        href: "/to-png",
        desc: "Convert JPG or PNG images to modern, lightweight WebP format.",
      },
      {
        name: "PNG to PDF",
        icon: assets.convert,
        href: "/png-to-pdf",
        desc: "Convert JPG or PNG images to modern, lightweight WebP format.",
      },
      {
        name: "Jpeg to PDF",
        icon: assets.convert,
        href: "/jpeg-to-pdf",
        desc: "Convert JPG or PNG images to modern, lightweight WebP format.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI Tools",
    items: [
      {
        name: "Text Summarizer",
        href: "/ai/summarizer",
        desc: "Summarize long articles or paragraphs into concise summaries using AI.",
      },
      {
        name: "Paraphraser",
        href: "/ai/paraphrase",
        desc: "Rewrite your text instantly with AI to improve clarity and originality.",
      },
      {
        name: "Image Captioning",
        href: "/ai/image-caption",
        desc: "Generate descriptive captions for images using smart AI vision.",
      },
    ],
  },
  {
    id: "dev",
    title: "Dev Tools",
    items: [
      {
        name: "JSON Viewer",
        href: "/dev/json-view",
        desc: "Format, visualize, and edit JSON data with a clean and simple interface.",
      },
      {
        name: "HTML Beautify",
        href: "/dev/html-beautify",
        desc: "Beautify and format your messy HTML code for better readability.",
      },
      {
        name: "CSS Minify",
        href: "/dev/css-minify",
        desc: "Compress CSS files to reduce load time and improve performance.",
      },
      {
        name: "Regex Tester",
        href: "/dev/regex-tester",
        desc: "Test and debug regular expressions interactively online.",
      },
    ],
  },
];
