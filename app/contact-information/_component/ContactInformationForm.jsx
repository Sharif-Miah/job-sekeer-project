'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContactStorage } from '@/hook/useContactstorage';
import { Download, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';

const ContactInformationForm = () => {
  const {
    formData,
    saveFormData,
    handleFileUpload,
    downloadFile,
    removeFile,
    isLoaded,
  } = useContactStorage();

  const [dragActive, setDragActive] = useState(false);

  if (!isLoaded) {
    return <div className='p-8 text-center'>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };
    saveFormData(newData);
  };

  const handleSocialMediaChange = (value) => {
    const newData = {
      ...formData,
      socialMediaType: value,
    };
    saveFormData(newData);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div>
      <form className='space-y-6'>
        {/* LinkedIn Profile */}
        <div className='space-y-2'>
          <Label
            htmlFor='linkedinProfile'
            className='text-sm font-medium'>
            LinkedIn Profile
          </Label>
          <Input
            id='linkedinProfile'
            name='linkedinProfile'
            placeholder='Enter your LinkedIn profile URL'
            value={formData.linkedinProfile}
            onChange={handleInputChange}
            className='border-gray-300'
          />
        </div>

        {/* Personal Website/Portfolio */}
        <div className='space-y-2'>
          <Label
            htmlFor='personalWebsite'
            className='text-sm font-medium'>
            Personal Website/Portfolio
          </Label>
          <Input
            id='personalWebsite'
            name='personalWebsite'
            placeholder='Enter your personal website or portfolio URL'
            value={formData.personalWebsite}
            onChange={handleInputChange}
            className='border-gray-300'
          />
        </div>

        {/* Other Social Media */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='socialMediaType'
              className='text-sm font-medium'>
              Other Social Media
            </Label>
            <Select
              value={formData.socialMediaType}
              onValueChange={handleSocialMediaChange}>
              <SelectTrigger className='border-gray-300'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Facebook'>Facebook</SelectItem>
                <SelectItem value='Twitter'>Twitter</SelectItem>
                <SelectItem value='Instagram'>Instagram</SelectItem>
                <SelectItem value='GitHub'>GitHub</SelectItem>
                <SelectItem value='YouTube'>YouTube</SelectItem>
                <SelectItem value='Other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='socialMediaUrl'
              className='text-sm font-medium'>
              URL
            </Label>
            <Input
              id='socialMediaUrl'
              name='socialMediaUrl'
              placeholder='Enter other social media profiles (optional)'
              value={formData.socialMediaUrl}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium'>Upload Profile Photo</Label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}>
            <input
              type='file'
              onChange={handleFileInputChange}
              accept='image/*,.pdf,.doc,.docx'
              className='hidden'
              id='fileInput'
            />
            <label
              htmlFor='fileInput'
              className='cursor-pointer'>
              <Upload
                className='mx-auto mb-2 text-gray-400'
                size={24}
              />
              <p className='text-sm text-gray-600'>
                Drag and drop your file here or click to browse
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                Supported: Images, PDF, DOC, DOCX (Max 10MB)
              </p>
            </label>
          </div>

          {formData.profilePhoto && (
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
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
                    className='flex items-center gap-2'>
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
            </div>
          )}
        </div>

        <div className='flex gap-4 pt-8'>
          <Button className='flex-1 bg-gray-500 hover:bg-gray-600 text-white'>
            ← Back
          </Button>
          <Link
            href='/ai-resume'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
            <Button
              type='submit'
              className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
              Next →
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ContactInformationForm;
