'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'education_data';

export function useEducationStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [degrees, setDegrees] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDegrees(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save degrees to localStorage
  const saveDegrees = (newDegrees) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDegrees));
      setDegrees(newDegrees);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Add new degree with files
  const addDegree = (degree, files) => {
    const newDegree = {
      id: Date.now(),
      ...degree,
      files: files || [],
    };
    const updated = [...degrees, newDegree];
    saveDegrees(updated);
    return newDegree;
  };

  // Remove degree by id
  const removeDegree = (id) => {
    const updated = degrees.filter((d) => d.id !== id);
    saveDegrees(updated);
  };

  // Update degree
  const updateDegree = (id, updatedData) => {
    const updated = degrees.map((d) =>
      d.id === id ? { ...d, ...updatedData } : d
    );
    saveDegrees(updated);
  };

  // Convert file to base64 for storage
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  // Add file to degree
  const addFileToDegree = async (degreeId, file) => {
    try {
      const base64 = await fileToBase64(file);
      const fileData = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: base64,
      };

      const updated = degrees.map((d) =>
        d.id === degreeId ? { ...d, files: [...(d.files || []), fileData] } : d
      );
      saveDegrees(updated);
      return fileData;
    } catch (error) {
      console.error('Error converting file:', error);
    }
  };

  // Remove file from degree
  const removeFileFromDegree = (degreeId, fileId) => {
    const updated = degrees.map((d) =>
      d.id === degreeId
        ? { ...d, files: d.files.filter((f) => f.id !== fileId) }
        : d
    );
    saveDegrees(updated);
  };

  return {
    degrees,
    isLoading,
    addDegree,
    removeDegree,
    updateDegree,
    addFileToDegree,
    removeFileFromDegree,
  };
}
