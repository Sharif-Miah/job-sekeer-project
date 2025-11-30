'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import ProgreesingBar from '@/components/ProgreesingBar';
import EducationcertificateProgess from '../education-certificate/_components/EducationcertificateProgess';

import YourCertificateForm from './_components/YourCertificateForm';
import Link from 'next/link';

export default function CertificationsForm() {
  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      {/* Header */}
      <EducationcertificateProgess />
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Your Certifications
          </h1>
          <p className='text-gray-600 text-sm'>
            Provide your academic qualifications and any relevant certifications
            to strengthen your resume.
          </p>
        </div>
        <Button
          onClick={() => onTabChange && onTabChange('education')}
          variant='outline'
          className='border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent'>
          Education
        </Button>
      </div>

      {/* Add New Certification Form */}
      <div className='border-t pt-8'>
        <YourCertificateForm />
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-4 pt-8'>
        <Link
          href='/education-certificate'
          className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
          <Button
            type='submit'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
            ← Back
          </Button>
        </Link>
        <Link
          href='/contact-information'
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
