'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useContactStorage() {
  const [formData, setFormData] = useState({
    linkedinProfile: '',
    personalWebsite: '',
    socialMediaType: 'Facebook',
    socialMediaUrl: '',
    profilePhoto: null,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveFormData = (newData) => {
    setFormData(newData);
    try {
      localStorage.setItem('contactFormData', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result;
      const newData = {
        ...formData,
        profilePhoto: {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64String,
          uploadedAt: new Date().toISOString(),
        },
      };
      saveFormData(newData);
    };
    reader.readAsDataURL(file);
  };

  const downloadFile = () => {
    if (!formData.profilePhoto) return;

    const { data, name } = formData.profilePhoto;
    const link = document.createElement('a');
    link.href = data;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    const newData = {
      ...formData,
      profilePhoto: null,
    };
    saveFormData(newData);
  };

  const clearFormData = () => {
    const emptyData = {
      linkedinProfile: '',
      personalWebsite: '',
      socialMediaType: 'Facebook',
      socialMediaUrl: '',
      profilePhoto: null,
    };
    saveFormData(emptyData);
  };

  return {
    formData,
    saveFormData,
    handleFileUpload,
    downloadFile,
    removeFile,
    clearFormData,
    isLoaded,
  };
}
