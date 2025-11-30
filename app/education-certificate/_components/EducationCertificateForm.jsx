'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Plus } from 'lucide-react';

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';

const EducationCertificateForm = () => {
  const [files, setFiles] = useState();
  const [degrees, setDegrees] = useState([
    {
      id: 1,
      degree: "Bachelor's, Masters",
      institution: 'Dhaka University',
      major: 'Electronics and Communication Engineering (ECE)',
      startDate: 'Start Date',
      endDate: 'End Date',
      achievements: 'Details for Degree',
      achievementSubtext: 'Private, until 1 month ago',
    },
  ]);

  const [newDegree, setNewDegree] = useState({
    degree: '',
    institution: '',
    major: '',
    startDate: '',
    endDate: '',
  });

  const handleDrop = (files) => {
    console.log(files);
    setFiles(files);
  };

  const handleAddDegree = () => {
    if (newDegree.degree && newDegree.institution) {
      setDegrees([
        ...degrees,
        {
          id: degrees.length + 1,
          ...newDegree,
          achievements: '',
          achievementSubtext: '',
        },
      ]);
      setNewDegree({
        degree: '',
        institution: '',
        major: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleRemoveDegree = (id) => {
    setDegrees(degrees.filter((d) => d.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDegree((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label
            htmlFor='degree'
            className='text-sm font-medium'>
            Your Degree
          </Label>
          <Input
            id='degree'
            name='degree'
            placeholder="e.g., Bachelor's, Masters"
            value={newDegree.degree}
            onChange={handleInputChange}
            className='border-gray-300'
          />
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='institution'
            className='text-sm font-medium'>
            Institution Name
          </Label>
          <Input
            id='institution'
            name='institution'
            placeholder='e.g., Dhaka University'
            value={newDegree.institution}
            onChange={handleInputChange}
            className='border-gray-300'
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label
            htmlFor='major'
            className='text-sm font-medium'>
            Major
          </Label>
          <Input
            id='major'
            name='major'
            placeholder='e.g., Electronics and Communication Engineering'
            value={newDegree.major}
            onChange={handleInputChange}
            className='border-gray-300'
          />
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='graduation'
            className='text-sm font-medium'>
            Graduation
          </Label>
          <div className='flex gap-2'>
            <Input
              type='date'
              name='startDate'
              value={newDegree.startDate}
              onChange={handleInputChange}
              className='border-gray-300'
            />
            <Input
              type='date'
              name='endDate'
              value={newDegree.endDate}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Dropzone
          maxSize={1024 * 1024 * 10}
          minSize={1024}
          onDrop={handleDrop}
          onError={console.error}
          src={files}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>
      <button
        onClick={handleAddDegree}
        className='text-green-500 hover:text-green-600 text-sm font-medium mt-6 flex items-center gap-1'>
        <Plus className='w-4 h-4' />
        Add Another Degree
      </button>

      <div className='flex gap-4 pt-8'>
        <Button className='flex-1 bg-gray-500 hover:bg-gray-600 text-white'>
          ← Back
        </Button>
        <Button className='flex-1 bg-green-500 hover:bg-green-600 text-white'>
          Next →
        </Button>
      </div>
    </form>
  );
};

export default EducationCertificateForm;
