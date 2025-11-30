'use client';
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
import { Camera, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ContactInformationForm = () => {
  const { formData, saveFormData, handleFileUpload, removeFile, isLoaded } =
    useContactStorage();

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

  const handlePhotoChange = (e) => {
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
          <Label className='text-sm font-medium'>Profile Photo</Label>

          {!formData.profilePhoto ? (
            <div className='border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-400 bg-gray-50'>
              <input
                type='file'
                onChange={handlePhotoChange}
                accept='image/*'
                capture='environment'
                className='hidden'
                id='photoInput'
              />
              <label
                htmlFor='photoInput'
                className='cursor-pointer flex flex-col items-center gap-2'>
                <Camera
                  className='text-gray-400'
                  size={32}
                />
                <p className='text-sm font-medium text-gray-700'>
                  Take or Upload Photo
                </p>
                <p className='text-xs text-gray-500'>
                  Click to select or take a photo
                </p>
              </label>
            </div>
          ) : (
            <div className='rounded-lg overflow-hidden border border-gray-200'>
              <div className='relative'>
                <Image
                  src={formData.profilePhoto.data || '/placeholder.svg'}
                  alt='Profile'
                  className='w-full h-64 object-cover'
                  width={100}
                  height={100}
                />
                <Button
                  type='button'
                  size='sm'
                  variant='destructive'
                  onClick={removeFile}
                  className='absolute top-2 right-2 flex items-center gap-2'>
                  <Trash2 size={16} />
                  Remove
                </Button>
              </div>
              <div className='p-3 bg-gray-50'>
                <p className='text-xs text-gray-600'>
                  Photo URL (stored in localStorage):{' '}
                  {formData.profilePhoto.data.substring(0, 50)}...
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  Uploaded:{' '}
                  {new Date(
                    formData.profilePhoto.uploadedAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='flex gap-4 pt-8'>
          <Link
            href='/your-certificate'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
            <Button
              type='submit'
              className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
              ← Back
            </Button>
          </Link>
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
