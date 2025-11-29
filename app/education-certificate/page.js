'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import FileUploadArea from '../work-experience-skills/components/FileUploadArea';
import ProgreesingBar from '@/components/ProgreesingBar';

export default function EducationForm({ onNext, onBack, currentStep }) {
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
    <div className='space-y-8 w-10/12 mx-auto'>
      {/* Header */}
      <ProgreesingBar />
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Your Educational Background
          </h1>
          <p className='text-gray-600 text-sm'>
            Provide your academic qualifications and any relevant certifications
            to strengthen your resume.
          </p>
        </div>
        <Button
          variant='outline'
          className='border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent'>
          Certifications
        </Button>
      </div>

      {/* Existing Degrees */}
      <div className='space-y-4'>
        {degrees.map((degree) => (
          <Card
            key={degree.id}
            className='border-gray-200'>
            <CardContent className='pt-6 space-y-4'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Your Degree
                  </Label>
                  <p className='text-sm font-medium text-foreground mt-1'>
                    {degree.degree}
                  </p>
                </div>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Institution Name
                  </Label>
                  <p className='text-sm font-medium text-foreground mt-1'>
                    {degree.institution}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Major
                  </Label>
                  <p className='text-sm font-medium text-foreground mt-1'>
                    {degree.major}
                  </p>
                </div>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Graduation
                  </Label>
                  <div className='flex gap-2 mt-1'>
                    <span className='text-sm text-gray-600'>
                      {degree.startDate}
                    </span>
                    <span className='text-sm text-gray-600'>
                      {degree.endDate}
                    </span>
                  </div>
                </div>
              </div>

              {degree.achievements && (
                <div className='border-t pt-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-sm font-medium text-foreground'>
                          {degree.achievements}
                        </span>
                      </div>
                      <p className='text-xs text-gray-500'>
                        {degree.achievementSubtext}
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleRemoveDegree(degree.id)}
                      className='text-gray-400 hover:text-red-600'>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Degree Form */}
      <div className='border-t pt-8'>
        <div className='space-y-6'>
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
        </div>

        {/* Add Another Degree Link */}

        <FileUploadArea />

        <button
          onClick={handleAddDegree}
          className='text-green-500 hover:text-green-600 text-sm font-medium mt-6 flex items-center gap-1'>
          <Plus className='w-4 h-4' />
          Add Another Degree
        </button>
      </div>

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
