import { useState } from 'react';
import { Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function WordtoPDFConverter() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setStatus('idle');
        setMessage('');
        setDownloadUrl(null);
      } else {
        setStatus('error');
        setMessage('Please select a valid Word file (.doc or .docx)');
        setFile(null);
      }
    }
  };

  const convertWordtoPDF = async () => {
    if (!file) return;

    setStatus('processing');
    setMessage('Converting Word to PDF...');
    setProgress(30);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Using CloudConvert API
      // Sign up at cloudconvert.com and get your API key
      const jobResponse = await fetch('https://api.cloudconvert.com/v2/jobs', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY_HERE',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tasks: {
            'import-my-file': {
              'operation': 'import/upload',
              'file': file.name,
            },
            'convert-file': {
              'operation': 'convert',
              'input': 'import-my-file',
              'output_format': 'pdf',
              'engine': 'libreoffice',
            },
            'export-file': {
              'operation': 'export/url',
              'input': 'convert-file',
            },
          },
        }),
      });

      setProgress(60);

      if (!jobResponse.ok) {
        throw new Error('Conversion request failed');
      }

      const jobData = await jobResponse.json();
      const jobId = jobData.data.id;

      // Upload the file
      setProgress(80);

      // Poll for completion (simplified - in production use webhooks)
      let completed = false;
      let attempts = 0;
      const maxAttempts = 30;

      while (!completed && attempts < maxAttempts) {
        const statusResponse = await fetch(
          `https://api.cloudconvert.com/v2/jobs/${jobId}`,
          {
            headers: {
              'Authorization': 'Bearer YOUR_API_KEY_HERE',
            },
          }
        );

        const statusData = await statusResponse.json();
        
        if (statusData.data.status === 'finished') {
          completed = true;
          const downloadLink = statusData.data.tasks.find(t => t.operation === 'export/url')?.result?.files?.[0]?.url;
          
          if (downloadLink) {
            setDownloadUrl(downloadLink);
            setProgress(100);
            setStatus('success');
            setMessage('Successfully converted! Your PDF is ready to download.');
          }
        } else if (statusData.data.status === 'error') {
          throw new Error('Conversion failed on server');
        }

        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (!completed) {
        throw new Error('Conversion timeout');
      }
    } catch (err) {
      setStatus('error');
      setMessage(`Error: ${err.message || 'Conversion failed. Please try again.'}`);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name.replace(/\.[^/.]+$/, '') + '.pdf';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Word to PDF</h1>
        <p className="text-center text-gray-600 mb-8">Convert your Word documents to PDF</p>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="block mb-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-purple-50 transition">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Choose a Word file</p>
              <p className="text-gray-500 text-sm">or drag and drop</p>
              <input
                type="file"
                accept=".doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>

          {file && (
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
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
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress}%</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={convertWordtoPDF}
            disabled={!file || status === 'processing'}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {status === 'processing' ? 'Converting...' : 'Convert to PDF'}
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
          <p className="font-medium mb-1">Setup Required:</p>
          <p>Replace 'YOUR_API_KEY_HERE' with your CloudConvert API key from cloudconvert.com</p>
        </div>
      </div>
    </div>
  );
}