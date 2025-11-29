'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';

import FileUploadArea from './components/FileUploadArea';
import ProgressStepper from './components/ProgressStepper';
import SkillsInput from './components/SkillsInput';
import ProgreesingBar from '@/components/ProgreesingBar';

export default function WorkExperiencePage() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    jobDescription: '',
    achievements: '',
    skills: [],
  });

  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.jobTitle && formData.companyName) {
      setExperiences([...experiences, { ...formData, id: Date.now() }]);
      setFormData({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        jobDescription: '',
        achievements: '',
        skills: [],
      });
    }
  };

  const handleNext = () => {
    // Navigate to next step
    console.log('Moving to next step');
  };

  const handleBack = () => {
    // Navigate to previous step
    console.log('Moving to previous step');
  };

  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Progress Stepper */}
        <ProgreesingBar />

        {/* Header Section */}
        <div className='mt-8 mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-foreground mb-2'>
                Your Work Experience & Skills
              </h1>
              <p className='text-muted-foreground'>
                Share your professional background and key skills to help us
                understand your expertise better
              </p>
            </div>
            <Button
              variant='outline'
              size='sm'>
              Step 3
            </Button>
          </div>
        </div>

        {/* Main Form Card */}
        {showForm && (
          <Card className='p-8 mb-6'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6'>
              {/* Job Title */}
              <div className='space-y-2'>
                <Label
                  htmlFor='jobTitle'
                  className='text-base font-semibold'>
                  Job Title
                </Label>
                <Input
                  id='jobTitle'
                  name='jobTitle'
                  placeholder='Web, e.g., Manager'
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className='h-10'
                />
              </div>

              {/* Company Name */}
              <div className='space-y-2'>
                <Label
                  htmlFor='companyName'
                  className='text-base font-semibold'>
                  Company Name
                </Label>
                <Input
                  id='companyName'
                  name='companyName'
                  placeholder='e.g., Microsoft, Amazon, Twitter'
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className='h-10'
                />
              </div>

              {/* Duration */}
              <div className='space-y-2'>
                <Label className='text-base font-semibold'>Duration</Label>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <Label
                      htmlFor='startDate'
                      className='text-sm text-muted-foreground'>
                      Start Date
                    </Label>
                    <Input
                      id='startDate'
                      name='startDate'
                      type='date'
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className='h-10'
                    />
                  </div>
                  <div className='space-y-1'>
                    <Label
                      htmlFor='endDate'
                      className='text-sm text-muted-foreground'>
                      End Date
                    </Label>
                    <Input
                      id='endDate'
                      name='endDate'
                      type='date'
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className='h-10'
                    />
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className='space-y-2'>
                <Label
                  htmlFor='jobDescription'
                  className='text-base font-semibold'>
                  Job Description/Responsibilities
                </Label>
                <Textarea
                  id='jobDescription'
                  name='jobDescription'
                  placeholder='Describe your main responsibilities and what you did...'
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className='min-h-24 resize-none'
                />
              </div>

              {/* Achievements */}
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='achievements'
                    className='text-base font-semibold'>
                    Achievements
                  </Label>
                  <Textarea
                    id='achievements'
                    name='achievements'
                    placeholder='Drop file to browse'
                    value={formData.achievements}
                    onChange={handleInputChange}
                    className='min-h-24 resize-none'
                  />
                </div>

                {/* Skills */}
                <div className='space-y-2'>
                  <Label className='text-base font-semibold'>Skills</Label>
                  <SkillsInput onAddSkill={handleAddSkill} />
                  <div className='flex flex-wrap gap-2 mt-3'>
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className='bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2'>
                        {skill}
                        <button
                          type='button'
                          onClick={() => handleRemoveSkill(index)}
                          className='hover:text-destructive transition-colors'>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <FileUploadArea />

              {/* Add Experience Link */}
              <div className='mt-6 pt-4 border-t'>
                <button
                  type='button'
                  className='text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1'>
                  <Plus size={16} />
                  Add/Edit Work Experience
                </button>
              </div>

              {/* Form Buttons */}
              <div className='flex gap-3 mt-8'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleBack}
                  className='flex-1 h-11 bg-transparent'>
                  Back
                </Button>
                <Button
                  type='submit'
                  className='flex-1 h-11 bg-green-600 hover:bg-green-700 text-white'>
                  Next
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
