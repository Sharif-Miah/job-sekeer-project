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
import ProgreesingBar from '@/components/ProgreesingBar';

export default function ContactInfoForm({ onNext, onBack, currentStep }) {
  const [formData, setFormData] = useState({
    linkedinProfile: '',
    personalWebsite: '',
    socialMediaType: 'Facebook',
    socialMediaUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaType: value,
    }));
  };

  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      {/* Header */}
      <ProgreesingBar />
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Your Contact Information
        </h1>
        <p className='text-gray-600 text-sm'>
          Include additional contact details and social media links to showcase
          your professional presence.
        </p>
      </div>

      {/* Form */}
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
      </form>

      {/* Navigation Buttons */}
      <div className='flex gap-4 pt-8'>
        <Button
          onClick={onBack}
          disabled={currentStep === 0}
          className='flex-1 bg-gray-500 hover:bg-gray-600 text-white'>
          ← Back
        </Button>
        <Button
          onClick={onNext}
          className='flex-1 bg-green-500 hover:bg-green-600 text-white'>
          Next →
        </Button>
      </div>
    </div>
  );
}
