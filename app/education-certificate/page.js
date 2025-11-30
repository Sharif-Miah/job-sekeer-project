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
import EducationcertificateProgess from './_components/EducationcertificateProgess';
import Link from 'next/link';

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
      <EducationcertificateProgess />
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
          <Link href='/your-certificate'>Certifications</Link>
        </Button>
      </div>

      {/* Existing Degrees */}

      {/* Add New Degree Form */}
      <div className='border-t pt-8'>
        <div className='space-y-6'>
          <EducationCertificateForm />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-4 pt-8 mt-8 border-t'>
        <Link
          href='/work-experience-skills'
          className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
          <Button
            type='submit'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
            ← Back
          </Button>
        </Link>
        <Link
          href='/your-certificate'
          className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
          <Button
            type='submit'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
            Next →
          </Button>
        </Link>
      </div>
    </div>
  );
}
