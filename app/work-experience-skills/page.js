'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Trash2 } from 'lucide-react';

import SkillsInput from './_components/SkillsInput';
import WorkExperienceProgress from './_components/WorkExperienceProgress';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import { useLocalStorage } from '@/hook/useLocalStorage';

const initialFormState = {
  jobTitle: '',
  companyName: '',
  startDate: '',
  endDate: '',
  jobDescription: '',
  achievements: '',
  skills: [],
};

export default function WorkExperiencePage() {
  const [formData, setFormData, formLoaded] = useLocalStorage(
    'workExperienceFormData',
    initialFormState
  );
  const [experiences, setExperiences, experiencesLoaded] = useLocalStorage(
    'workExperiences',
    []
  );

  const [files, setFiles] = useState();
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const handleDrop = (files) => {
    console.log(files);
    setFiles(files);
  };

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
      if (editingId) {
        // Update existing experience
        setExperiences((prev) =>
          prev.map((exp) =>
            exp.id === editingId ? { ...formData, id: editingId } : exp
          )
        );
        setEditingId(null);
      } else {
        // Add new experience
        setExperiences((prev) => [...prev, { ...formData, id: Date.now() }]);
      }

      // Reset form
      setFormData(initialFormState);
    }
  };

  const handleEdit = (experience) => {
    setFormData({
      jobTitle: experience.jobTitle,
      companyName: experience.companyName,
      startDate: experience.startDate,
      endDate: experience.endDate,
      jobDescription: experience.jobDescription,
      achievements: experience.achievements,
      skills: [...experience.skills],
    });
    setEditingId(experience.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setShowForm(false);
  };

  const handleNext = () => {
    console.log('Moving to next step with experiences:', experiences);
  };

  const handleBack = () => {
    console.log('Moving to previous step');
  };

  // Show loading state while data is being loaded from localStorage
  if (!formLoaded || !experiencesLoaded) {
    return (
      <div className='min-h-screen bg-background p-6 flex items-center justify-center'>
        <p className='text-muted-foreground'>Loading your data...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Progress Stepper */}
        <WorkExperienceProgress />

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
                  placeholder='e.g., Web Developer, Manager'
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
                    placeholder='List your key achievements...'
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
              <Dropzone
                maxSize={1024 * 1024 * 10}
                minSize={1024}
                onDrop={handleDrop}
                onError={console.error}
                src={files}>
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>

              {/* Form Buttons */}
              <div className='flex gap-3 mt-8'>
                <Button
                  variant='outline'
                  className='flex-1 h-11 bg-transparent'>
                  ← Back
                </Button>
                <Button
                  type='submit'
                  className='flex-1 h-11'>
                  Next →
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Saved Experiences List */}
        {experiences.length > 0 && (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-foreground'>
              Your Experiences ({experiences.length})
            </h2>
            {experiences.map((experience) => (
              <Card
                key={experience.id}
                className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-bold text-foreground'>
                      {experience.jobTitle}
                    </h3>
                    <p className='text-muted-foreground'>
                      {experience.companyName}
                    </p>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {experience.startDate} to{' '}
                      {experience.endDate || 'Present'}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleDelete(experience.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className='space-y-3'>
                  {experience.jobDescription && (
                    <div>
                      <p className='text-sm font-semibold text-foreground'>
                        Description
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {experience.jobDescription}
                      </p>
                    </div>
                  )}

                  {experience.achievements && (
                    <div>
                      <p className='text-sm font-semibold text-foreground'>
                        Achievements
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {experience.achievements}
                      </p>
                    </div>
                  )}

                  {experience.skills.length > 0 && (
                    <div>
                      <p className='text-sm font-semibold text-foreground mb-2'>
                        Skills
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {experience.skills.map((skill, index) => (
                          <span
                            key={index}
                            className='bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs'>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
      </div>
    </div>
  );
}
