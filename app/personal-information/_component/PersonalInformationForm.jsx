'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const PersonalInformationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    country: 'Bangladesh',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const notify = () =>
    toast.success('Success Fully Personal Information Data Added!');
  const router = useRouter();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('personalInformation');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  // Handle form submission
  function onSubmit(event) {
    event.preventDefault();
    try {
      // Save to localStorage
      localStorage.setItem('personalInformation', JSON.stringify(formData));
      console.log('Data saved to localStorage:', formData);
      notify();
      router.push('/career-summery');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className='space-y-6'>
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
            className='border-gray-300'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleInputChange}
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
            className='border-gray-300'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleInputChange}
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
            className='border-gray-300'
            placeholder='Phone Number'
            value={formData.phoneNumber}
            onChange={handleInputChange}
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
            className='border-gray-300'
            placeholder='Email Address'
            value={formData.email}
            onChange={handleInputChange}
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
            onValueChange={handleSelectChange}>
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
            className='border-gray-300'
            placeholder='Address'
            value={formData.address}
            onChange={handleInputChange}
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
            className='border-gray-300'
            placeholder='City'
            value={formData.city}
            onChange={handleInputChange}
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
            className='border-gray-300'
            placeholder='State'
            value={formData.state}
            onChange={handleInputChange}
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
            className='border-gray-300'
            placeholder='ZIP Code'
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='flex gap-4 pt-8'>
        <Button
          disabled
          className='flex-1 bg-gray-500 hover:bg-gray-600 text-white'>
          ← Back
        </Button>
        <Button
          type='submit'
          className='flex-1 bg-green-500 hover:bg-green-600 text-white'>
          Next →
        </Button>
      </div>
    </form>
  );
};

export default PersonalInformationForm;
