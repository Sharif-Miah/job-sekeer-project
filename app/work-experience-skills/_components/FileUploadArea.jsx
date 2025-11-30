'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function FileUploadArea() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-green-600 bg-green-50'
          : 'border-gray-300 bg-gray-50'
      }`}>
      <Upload
        className='mx-auto mb-3 text-gray-400'
        size={24}
      />
      <p className='text-sm text-gray-600'>Drop file to browse</p>
    </div>
  );
}
