'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProgreesingBar from '@/components/ProgreesingBar';
import Link from 'next/link';
import ProgressInAI from './_component/ProgressInAI';

export default function AIResumeForm() {
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isGenerating]);

  return (
    <div className='w-10/12 mx-auto'>
      <div className='bg-white rounded-lg shadow-sm p-8 md:p-12'>
        {/* Header */}
        <ProgressInAI />
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
            AI Resume Magic
          </h1>
          <p className='text-gray-600 text-base md:text-lg'>
            Now, lets turn all the information you have provided into a
            professional resume! Our AI will generate a polished version that
            showcases your strengths and matches industry standards.
          </p>
        </div>

        {/* Loading State */}
        <div className='py-16'>
          <div className='mb-6'>
            <p className='text-gray-700 font-medium mb-4'>
              AI is refining your resume...
            </p>
            <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
              <div
                className='bg-green-500 h-full transition-all duration-300'
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={() => {
              setIsGenerating(false);
              // Resume generation would happen here
            }}
            disabled={!isGenerating}
            className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-base h-auto'>
            Generate Resume
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-4 mt-8'>
        <Link
          href='/contact-information'
          className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
          <Button
            type='submit'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
            ← Back
          </Button>
        </Link>
        <Link
          href='/review-your-resume'
          className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
          <Button
            type='submit'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
            Next →
          </Button>
        </Link>
      </div>
    </div>
  );
}
