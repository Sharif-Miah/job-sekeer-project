'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Download, Trash2 } from 'lucide-react';
import { useEducationStorage } from '@/hook/useEducationStorage';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

export default function EducationCertificateForm() {
  const router = useRouter();
  const notify = () => toast.success('Successfull education data added !');
  const {
    degrees,
    isLoading,
    addDegree,
    removeDegree,
    addFileToDegree,
    removeFileFromDegree,
  } = useEducationStorage();

  const [newDegree, setNewDegree] = useState({
    degree: '',
    institution: '',
    major: '',
    startDate: '',
    endDate: '',
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDegree((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer?.files || e.target?.files;
    if (files && files.length > 0 && degrees.length > 0) {
      const lastDegreeId = degrees[degrees.length - 1].id;
      for (const file of files) {
        if (file.size <= 1024 * 1024 * 10) {
          await addFileToDegree(lastDegreeId, file);
        }
      }
    }
  };

  const handleAddDegree = () => {
    if (newDegree.degree && newDegree.institution) {
      addDegree(newDegree, []);
      setNewDegree({
        degree: '',
        institution: '',
        major: '',
        startDate: '',
        endDate: '',
      });
      notify();
    }
  };

  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  if (isLoading) {
    return (
      <div className='p-8 text-center'>Loading your education data...</div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-8'>
      {/* Saved Degrees List */}
      <div className='space-y-4 my-6'>
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

      {/* Form Section */}
      <div className='bg-white rounded-lg border p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-6'>Add New Degree</h2>

        <div className='grid grid-cols-2 gap-6 mb-6'>
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

        <div className='grid grid-cols-2 gap-6 mb-6'>
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
              Graduation Date
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

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}>
          <label className='cursor-pointer'>
            <input
              type='file'
              multiple
              onChange={handleDrop}
              className='hidden'
              accept='*/*'
            />
            <div className='space-y-2'>
              <p className='text-gray-600'>
                Drag and drop files here or click to upload
              </p>
              <p className='text-sm text-gray-500'>Maximum file size: 10MB</p>
            </div>
          </label>
        </div>

        <button
          type='button'
          onClick={handleAddDegree}
          className='text-green-500 hover:text-green-600 text-sm font-medium mt-6 flex items-center gap-1'>
          <Plus className='w-4 h-4' />
          Add Degree
        </button>
      </div>

      {/* Navigation Buttons */}
    </div>
  );
}
