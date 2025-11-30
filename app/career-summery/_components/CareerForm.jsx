'use client';

import { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CareerForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    careerSummary: 'Write Career Summary',
  });

  const notify = () => toast.success('Success Fully Career Data Added!');
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('careerInformation');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

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

  async function onSubmit(event) {
    event.preventDefault();
    try {
      // Save to localStorage
      localStorage.setItem('careerInformation', JSON.stringify(formData));
      console.log('Data saved to localStorage:', formData);
      notify();
      router.push('/work-experience-skills');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <>
      <form
        className='space-y-6'
        onSubmit={onSubmit}>
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
              <SelectItem value='Full Stack Developer'>
                Full Stack Developer
              </SelectItem>
              <SelectItem value='Frond End Developer'>
                Frond End Developer
              </SelectItem>
              <SelectItem value='Back End Developer'>
                Back End Developer
              </SelectItem>
              <SelectItem value='Digital Marketing Specialist'>
                Digital Marketing
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
            Job Describtion
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
        <div className='flex gap-4 pt-8'>
          <Button className='flex-1 bg-gray-500 hover:bg-gray-600 text-white'>
            ← Back
          </Button>
          <Button
            type='submit'
            className='flex-1 bg-green-500 hover:bg-green-600 text-white'>
            Next →
          </Button>
        </div>
        ;
      </form>
    </>
  );

  {
    /* Navigation Buttons */
  }
};

export default CareerForm;
