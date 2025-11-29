'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import ProgreesingBar from '@/components/ProgreesingBar';

export default function CertificationsForm({
  onNext,
  onBack,
  currentStep,
  onTabChange,
}) {
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: 'High BNCC',
      organization: 'Dhaka University',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date (if applicable)',
    },
  ]);

  const [newCertification, setNewCertification] = useState({
    title: '',
    organization: '',
    issueDate: '',
    expiryDate: '',
  });

  const handleAddCertification = () => {
    if (newCertification.title && newCertification.organization) {
      setCertifications([
        ...certifications,
        {
          id: certifications.length + 1,
          ...newCertification,
        },
      ]);
      setNewCertification({
        title: '',
        organization: '',
        issueDate: '',
        expiryDate: '',
      });
    }
  };

  const handleRemoveCertification = (id) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertification((prev) => ({
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

      {/* Existing Certifications */}
      <div className='space-y-4'>
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            className='border-gray-200'>
            <CardContent className='pt-6 space-y-4'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Certification Title
                  </Label>
                  <p className='text-sm font-medium text-foreground mt-1'>
                    {cert.title}
                  </p>
                </div>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Issuing Organization
                  </Label>
                  <p className='text-sm font-medium text-foreground mt-1'>
                    {cert.organization}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Issue Date
                  </Label>
                  <p className='text-sm text-gray-600 mt-1'>{cert.issueDate}</p>
                </div>
                <div>
                  <Label className='text-xs text-gray-600 font-medium'>
                    Expiry Date
                  </Label>
                  <p className='text-sm text-gray-600 mt-1'>
                    {cert.expiryDate}
                  </p>
                </div>
              </div>

              <div className='border-t pt-4 flex justify-end'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleRemoveCertification(cert.id)}
                  className='text-gray-400 hover:text-red-600'>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Certification Form */}
      <div className='border-t pt-8'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='title'
              className='text-sm font-medium'>
              Certification Title
            </Label>
            <Input
              id='title'
              name='title'
              placeholder='e.g., High BNCC'
              value={newCertification.title}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='organization'
              className='text-sm font-medium'>
              Issuing Organization
            </Label>
            <Input
              id='organization'
              name='organization'
              placeholder='e.g., Dhaka University'
              value={newCertification.organization}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>

          <div>
            <Label className='text-sm font-medium'>Certificate Issue</Label>
            <div className='grid grid-cols-2 gap-4 mt-2'>
              <div className='space-y-2'>
                <Label
                  htmlFor='issueDate'
                  className='text-xs text-gray-600'>
                  Issue Date
                </Label>
                <Input
                  id='issueDate'
                  type='date'
                  name='issueDate'
                  value={newCertification.issueDate}
                  onChange={handleInputChange}
                  className='border-gray-300'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='expiryDate'
                  className='text-xs text-gray-600'>
                  Expiry Date (if applicable)
                </Label>
                <Input
                  id='expiryDate'
                  type='date'
                  name='expiryDate'
                  value={newCertification.expiryDate}
                  onChange={handleInputChange}
                  className='border-gray-300'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Another Certification Link */}
        <button
          onClick={handleAddCertification}
          className='text-green-500 hover:text-green-600 text-sm font-medium mt-6 flex items-center gap-1'>
          <Plus className='w-4 h-4' />
          Add Another Certification
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
