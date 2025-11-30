'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePhotoUpload() {
  const [formData, setFormData] = useState({
    profilePhoto: null,
  });
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData({
        profilePhoto: {
          ...file,
          uploadedAt: new Date().toISOString(),
          preview,
        },
      });
    }
  };

  // Download the file
  const downloadFile = () => {
    if (formData.profilePhoto?.preview) {
      const link = document.createElement('a');
      link.href = formData.profilePhoto.preview;
      link.download = formData.profilePhoto.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Remove the file and revoke the URL
  const removeFile = () => {
    if (formData.profilePhoto?.preview) {
      URL.revokeObjectURL(formData.profilePhoto.preview);
    }
    setFormData({ profilePhoto: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-6 text-gray-900'>
          Upload Profile Photo
        </h1>

        {/* File Input */}
        <div className='mb-6'>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleFileSelect}
            className='block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100'
          />
        </div>

        {/* Image Preview Section */}
        {formData.profilePhoto?.preview && (
          <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6'>
            <div className='mb-4'>
              <Image
                src={formData.profilePhoto.preview || '/placeholder.svg'}
                alt='Profile preview'
                className='w-full h-48 object-cover rounded-md'
              />
            </div>

            {/* File Details */}
            <div className='mb-4'>
              <p className='text-sm font-medium text-gray-900'>
                {formData.profilePhoto.name}
              </p>
              <p className='text-xs text-gray-500'>
                {(formData.profilePhoto.size / 1024).toFixed(2)} KB
              </p>
              <p className='text-xs text-gray-500'>
                Uploaded:{' '}
                {new Date(
                  formData.profilePhoto.uploadedAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className='flex gap-2'>
              <Button
                type='button'
                size='sm'
                variant='outline'
                onClick={downloadFile}
                className='flex items-center gap-2 bg-transparent'>
                <Download size={16} />
                Download
              </Button>
              <Button
                type='button'
                size='sm'
                variant='destructive'
                onClick={removeFile}
                className='flex items-center gap-2'>
                <Trash2 size={16} />
                Remove
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
