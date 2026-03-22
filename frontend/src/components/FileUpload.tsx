import React, { useCallback, useState } from 'react';
import { Upload, File, X, Check } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File, type: string) => void;
  acceptedTypes: string;
  maxSize: number;
  label: string;
  description: string;
  currentFile?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes,
  maxSize,
  label,
  description,
  currentFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (file.size > maxSize) {
      alert(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      return;
    }

    setUploadedFile(file);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileUpload(file, 'upload');
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      
      {!uploadedFile && !currentFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop your file here, or{' '}
            <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
              browse
              <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">
            Maximum file size: {maxSize / 1024 / 1024}MB
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile?.name || currentFile}
                </p>
                <p className="text-xs text-gray-500">
                  {uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'Uploaded'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {uploadProgress === 100 ? (
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              ) : uploadProgress > 0 ? (
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              ) : null}
              <button
                onClick={removeFile}
                className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;