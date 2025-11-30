'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import FileUploadArea from '../work-experience-skills/_components/FileUploadArea';
import ProgreesingBar from '@/components/ProgreesingBar';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import EducationCertificateForm from './_components/EducationCertificateForm';

export default function EducationForm() {
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
          <EducationCertificateForm />
        </div>
      </div>

      {/* Navigation Buttons */}
    </div>
  );
}
