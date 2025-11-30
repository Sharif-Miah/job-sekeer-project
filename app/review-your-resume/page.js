'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ImagePerson from '@/public/download.jpg';
import ProgreesingBar from '@/components/ProgreesingBar';
import ReviewProgress from './_component/ReviewProgress';

export default function ReviewResumeForm({ onNext, onBack }) {
  const handleDownload = () => {
    // Download functionality would be implemented here
    console.log('Download resume');
  };

  const handleEdit = () => {
    // Edit functionality would be implemented here
    console.log('Edit resume');
  };

  return (
    <div className='w-10/12 mx-auto'>
      <div className='bg-white rounded-lg shadow-sm p-8 md:p-12'>
        {/* Header */}
        <ReviewProgress />
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
            Review Your AI-Generated Resume
          </h1>
          <p className='text-gray-600 text-base'>
            Review and edit your resume before downloading
          </p>
        </div>

        {/* Resume Preview Card */}
        <div className='border border-gray-300 rounded-lg p-8 md:p-12 mb-8 bg-white'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Left Sidebar */}
            <div className='md:col-span-1'>
              {/* Profile Picture */}
              <div className='mb-6 flex justify-center md:justify-start'>
                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden'>
                  <Image
                    src={ImagePerson}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>

              {/* Name */}
              <h2 className='text-2xl font-bold text-gray-900 mb-1 text-center md:text-left'>
                Sharif Miah
              </h2>
              <p className='text-gray-600 text-sm text-center md:text-left mb-6'>
                Full Stack Developer
              </p>

              {/* Portfolio Section */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>
                  PORTFOLIO
                </h3>
                <ul className='space-y-2'>
                  <li>
                    <a
                      href='#'
                      className='text-blue-600 hover:underline text-xs'>
                      portfolio.example.com
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-blue-600 hover:underline text-xs'>
                      linkedin.com/in/saifur
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-blue-600 hover:underline text-xs'>
                      github.com/saifur
                    </a>
                  </li>
                </ul>
              </div>

              {/* Skills Section */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>SKILLS</h3>
                <ul className='space-y-1 text-xs text-gray-700'>
                  <li>Digital Marketing</li>
                  <li>SEO Optimization</li>
                  <li>Content Strategy</li>
                  <li>Social Media</li>
                  <li>Analytics</li>
                  <li>Brand Management</li>
                  <li>Project Management</li>
                </ul>
              </div>

              {/* Languages Section */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>
                  LANGUAGES
                </h3>
                <ul className='space-y-1 text-xs text-gray-700'>
                  <li>English - Fluent</li>
                  <li>Bengali - Native</li>
                  <li>Spanish - Intermediate</li>
                </ul>
              </div>

              {/* Co-curricular Activities */}
              <div>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>
                  CO-CURRICULAR ACTIVITIES
                </h3>
                <ul className='space-y-1 text-xs text-gray-700'>
                  <li>Event Organizing</li>
                  <li>Volunteering</li>
                  <li>Mentoring</li>
                </ul>
              </div>
            </div>

            {/* Right Content */}
            <div className='md:col-span-3'>
              {/* About Me */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  ABOUT ME
                </h3>
                <p className='text-xs text-gray-700 leading-relaxed'>
                  Experienced marketing professional with over 5 years of
                  expertise in digital marketing, specializing in SEO, social
                  media strategies, and content creation. Proven track record of
                  increasing brand visibility and driving measurable results.
                  Passionate about leveraging data-driven insights to optimize
                  marketing campaigns.
                </p>
              </div>

              {/* Education Qualification */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  EDUCATION QUALIFICATION
                </h3>
                <div className='mb-3'>
                  <p className='text-xs font-semibold text-gray-900'>
                    Bachelor of Science in Business Administration
                  </p>
                  <p className='text-xs text-gray-700'>
                    University of Technology (2020)
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-gray-900'>
                    Master of Marketing
                  </p>
                  <p className='text-xs text-gray-700'>
                    Digital Institute (2022)
                  </p>
                </div>
              </div>

              {/* Training/Certification */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  TRAINING/CERTIFICATION
                </h3>
                <ul className='space-y-1 text-xs text-gray-700'>
                  <li>Google Analytics Certified</li>
                  <li>HubSpot Content Marketing Certified</li>
                  <li>Facebook Blueprint Certification</li>
                </ul>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  WORK EXPERIENCE
                </h3>
                <div className='mb-4'>
                  <p className='text-xs font-semibold text-gray-900'>
                    Senior Marketing Specialist
                  </p>
                  <p className='text-xs text-gray-700 mb-1'>
                    Tech Solutions Inc. | 2022 - Present
                  </p>
                  <p className='text-xs text-gray-700 leading-relaxed'>
                    Led comprehensive marketing campaigns increasing brand
                    awareness by 45%. Managed social media platforms with 100K+
                    followers. Developed content strategy that improved
                    engagement rates.
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-gray-900'>
                    Marketing Executive
                  </p>
                  <p className='text-xs text-gray-700 mb-1'>
                    Digital Innovations Ltd. | 2020 - 2022
                  </p>
                  <p className='text-xs text-gray-700 leading-relaxed'>
                    Executed SEO optimization strategies improving search
                    rankings. Created and managed email marketing campaigns with
                    35% open rate. Collaborated with cross-functional teams on
                    product launches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4'>
          <Button
            onClick={handleEdit}
            variant='outline'
            className='flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg text-base h-auto border-0'>
            Edit Resume
          </Button>
          <Button
            onClick={handleDownload}
            className='flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-base h-auto'>
            Download Resume
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-4 mt-8'>
        <Button
          onClick={onBack}
          variant='outline'
          className='flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg text-base h-auto border-0'>
          Back
        </Button>
        <Button
          onClick={onNext}
          className='flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-base h-auto'>
          Next
        </Button>
      </div>
    </div>
  );
}
