import { useState } from 'react';
import { Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function PDFtoWordConverter() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setStatus('idle');
        setMessage('');
      } else {
        setStatus('error');
        setMessage('Please select a valid PDF file');
        setFile(null);
      }
    }
  };

  const convertPDFtoWord = async () => {
    if (!file) return;

    setStatus('processing');
    setMessage('Converting PDF to Word...');
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Using CloudConvert API (free tier available)
      // You'll need to sign up at cloudconvert.com and get an API key
      const response = await fetch('https://api.cloudconvert.com/v2/jobs', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY_HERE',
        },
        body: JSON.stringify({
          tasks: {
            'import-my-file': {
              'operation': 'import/upload',
              'file': file,
            },
            'convert-file': {
              'operation': 'convert',
              'input': 'import-my-file',
              'output_format': 'docx',
              'engine': 'libreoffice',
            },
            'export-file': {
              'operation': 'export/url',
              'input': 'convert-file',
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      setProgress(100);
      setStatus('success');
      setMessage(`Successfully converted! Download your file.`);
    } catch (err) {
      setStatus('error');
      setMessage(`Error: ${err.message || 'Conversion failed. Please try again.'}`);
    }
  };

  const handleDownload = () => {
    // Placeholder for download logic
    setMessage('Download functionality requires backend setup');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">PDF to Word</h1>
        <p className="text-center text-gray-600 mb-8">Convert your PDF files to Word documents</p>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="block mb-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Choose a PDF file</p>
              <p className="text-gray-500 text-sm">or drag and drop</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>

          {file && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-gray-800">Selected file:</p>
              <p className="text-sm text-gray-600">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">{message}</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{message}</p>
          </div>
        )}

        {status === 'processing' && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">{message}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={convertPDFtoWord}
            disabled={!file || status === 'processing'}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {status === 'processing' ? 'Converting...' : 'Convert to Word'}
          </button>

          {status === 'success' && (
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-medium mb-1">Note:</p>
          <p>This requires a backend service (like CloudConvert or LibreOffice) to handle the actual conversion.</p>
        </div>
      </div>
    </div>
  );
}