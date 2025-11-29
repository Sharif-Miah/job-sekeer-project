'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProgreesingBar from '@/components/ProgreesingBar';

export default function PersonalInfoForm({ onNext, onBack, currentStep }) {
  const [formData, setFormData] = useState({
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    email: 'Email',
    country: 'Bangladesh',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      <ProgreesingBar />
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Tell Us About Yourself
        </h1>
        <p className='text-gray-600 text-sm'>
          Fill in your personal details so we can tailor your resume perfectly
          to your career goals.
        </p>
      </div>

      {/* Form */}
      <form className='space-y-6'>
        {/* First Name and Last Name */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='firstName'
              className='text-sm font-medium'>
              First Name
            </Label>
            <Input
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='lastName'
              className='text-sm font-medium'>
              Last Name
            </Label>
            <Input
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
        </div>

        {/* Phone Number and Email Address */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='phoneNumber'
              className='text-sm font-medium'>
              Phone Number
            </Label>
            <Input
              id='phoneNumber'
              name='phoneNumber'
              type='tel'
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='text-sm font-medium'>
              Email Address
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
        </div>

        {/* Country/Region and Address */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='country'
              className='text-sm font-medium'>
              Country/Region
            </Label>
            <Select
              value={formData.country}
              onValueChange={handleCountryChange}>
              <SelectTrigger className='border-gray-300'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Bangladesh'>Bangladesh</SelectItem>
                <SelectItem value='United States'>United States</SelectItem>
                <SelectItem value='United Kingdom'>United Kingdom</SelectItem>
                <SelectItem value='Canada'>Canada</SelectItem>
                <SelectItem value='Australia'>Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='address'
              className='text-sm font-medium'>
              Address
            </Label>
            <Input
              id='address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
        </div>

        {/* City, State, and ZIP Code */}
        <div className='grid grid-cols-3 gap-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='city'
              className='text-sm font-medium'>
              City
            </Label>
            <Input
              id='city'
              name='city'
              value={formData.city}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='state'
              className='text-sm font-medium'>
              State
            </Label>
            <Input
              id='state'
              name='state'
              value={formData.state}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='zipCode'
              className='text-sm font-medium'>
              ZIP Code
            </Label>
            <Input
              id='zipCode'
              name='zipCode'
              value={formData.zipCode}
              onChange={handleInputChange}
              className='border-gray-300'
            />
          </div>
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
