'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProgreesingBar from '@/components/ProgreesingBar';

export default function CareerOverviewForm({ onNext, onBack, currentStep }) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    careerSummary: 'Write Career Summary',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobTitleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      jobTitle: value,
    }));
  };

  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      <ProgreesingBar />
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Your Career Overview
        </h1>
        <p className='text-gray-600 text-sm'>
          A strong career summary will make a lasting impression on recruiters.
          Lets create a summary that highlights your experience and goals.
        </p>
      </div>

      {/* Form */}
      <form className='space-y-6'>
        {/* Job Title Dropdown */}
        <div className='space-y-2'>
          <Label
            htmlFor='jobTitle'
            className='text-sm font-medium'>
            Job Title
          </Label>
          <Select
            value={formData.jobTitle}
            onValueChange={handleJobTitleChange}>
            <SelectTrigger className='border-gray-300'>
              <SelectValue placeholder='Enter your most recent or current job title' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Marketing Manager'>
                Marketing Manager
              </SelectItem>
              <SelectItem value='Digital Marketing Specialist'>
                Digital Marketing Specialist
              </SelectItem>
              <SelectItem value='SEO Specialist'>SEO Specialist</SelectItem>
              <SelectItem value='Content Manager'>Content Manager</SelectItem>
              <SelectItem value='Social Media Manager'>
                Social Media Manager
              </SelectItem>
              <SelectItem value='Marketing Director'>
                Marketing Director
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Career Summary Text Area */}
        <div className='space-y-2'>
          <Label
            htmlFor='careerSummary'
            className='text-sm font-medium'>
            Job Title
          </Label>
          <Textarea
            id='careerSummary'
            name='careerSummary'
            value={formData.careerSummary}
            onChange={handleInputChange}
            placeholder='Write a compelling career summary...'
            className='border-gray-300 min-h-40 resize-none'
          />
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
