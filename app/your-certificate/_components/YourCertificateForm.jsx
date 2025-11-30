/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Download, FileX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCertificationStorage } from '@/hook/useCertification';

export default function YourCertificateForm() {
  const {
    loadCertifications,
    saveCertifications,
    addFileToCertification,
    removeFileFromCertification,
    downloadFile,
  } = useCertificationStorage();
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCertification, setNewCertification] = useState({
    title: '',
    organization: '',
    issueDate: '',
    expiryDate: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const data = loadCertifications();
    if (data.length === 0) {
      // Default data if empty
      data.push({
        id: 1,
        title: '',
        organization: '',
        issueDate: '',
        expiryDate: '',
      });
    }
    setCertifications(data);
    setIsLoading(false);
  }, []);

  // Save whenever certifications change
  useEffect(() => {
    if (!isLoading) {
      saveCertifications(certifications);
    }
  }, [certifications, isLoading]);

  const handleAddCertification = () => {
    if (newCertification.title && newCertification.organization) {
      const updated = [
        ...certifications,
        {
          id: Date.now(),
          ...newCertification,
        },
      ];
      setCertifications(updated);
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

  const handleFileUpload = async (id, file) => {
    const success = await addFileToCertification(id, file);
    if (success) {
      // Update local state to reflect file addition
      const updated = certifications.map((c) =>
        c.id === id ? { ...c, file: { name: file.name, size: file.size } } : c
      );
      setCertifications(updated);
    }
  };

  const handleFileRemove = (id) => {
    const success = removeFileFromCertification(id);
    if (success) {
      const updated = certifications.map((c) =>
        c.id === id ? { ...c, file: undefined } : c
      );
      setCertifications(updated);
    }
  };

  if (isLoading) {
    return <div className='p-6'>Loading...</div>;
  }

  return (
    <div>
      {/* Existing Certifications */}
      <div className='space-y-4'>
        {certifications &&
          certifications.map((cert) => (
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
                    <p className='text-sm text-gray-600 mt-1'>
                      {cert.issueDate}
                    </p>
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
      <form className='mt-6'>
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

        {/* Add Another Certification Button */}
        <button
          type='button'
          onClick={handleAddCertification}
          className='text-green-500 hover:text-green-600 text-sm font-medium mt-6 flex items-center gap-1'>
          <Plus className='w-4 h-4' />
          Add Another Certification
        </button>
      </form>
    </div>
  );
}
