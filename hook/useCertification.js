'use client';

import { useState } from 'react';

export function useCertificationStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const STORAGE_KEY = 'certifications_data';

  // Load data from localStorage
  const loadCertifications = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading certifications:', error);
    }
    return [];
  };

  // Save data to localStorage
  const saveCertifications = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving certifications:', error);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Add file to certification
  const addFileToCertification = async (id, file) => {
    try {
      const base64 = await fileToBase64(file);
      const data = loadCertifications();
      const certIndex = data.findIndex((c) => c.id === id);

      if (certIndex !== -1) {
        data[certIndex].file = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        };
        saveCertifications(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding file:', error);
      return false;
    }
  };

  // Remove file from certification
  const removeFileFromCertification = (id) => {
    const data = loadCertifications();
    const certIndex = data.findIndex((c) => c.id === id);

    if (certIndex !== -1) {
      delete data[certIndex].file;
      saveCertifications(data);
      return true;
    }
    return false;
  };

  // Download file
  const downloadFile = (id) => {
    const data = loadCertifications();
    const cert = data.find((c) => c.id === id);

    if (cert && cert.file) {
      const link = document.createElement('a');
      link.href = cert.file.data;
      link.download = cert.file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    loadCertifications,
    saveCertifications,
    addFileToCertification,
    removeFileFromCertification,
    downloadFile,
    isLoading,
  };
}
