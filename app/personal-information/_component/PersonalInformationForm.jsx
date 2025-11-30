'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Download } from 'lucide-react';

import ReviewProgress from '@/app/review-your-resume/_component/ReviewProgress';
import { generateResumePDF } from '@/utils/utils';

export default function ReviewResumeForm() {
  const [resumeData, setResumeData] = useState({
    personal: null,
    careear: null,
    experience: null,
    educationer: [],
    certi: [],
    contactData: null,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const personalData = localStorage.getItem('personalInformation');
      const careearData = localStorage.getItem('careerInformation');
      const workExperience = localStorage.getItem('workExperienceFormData');
      const educationexpe = localStorage.getItem('education_data');
      const certificatex = localStorage.getItem('certifications_data');
      const contact = localStorage.getItem('contactFormData');

      setResumeData({
        personal: personalData ? JSON.parse(personalData) : null,
        careear: careearData ? JSON.parse(careearData) : null,
        experience: workExperience ? JSON.parse(workExperience) : null,
        educationer: educationexpe ? JSON.parse(educationexpe) : [],
        certi: certificatex ? JSON.parse(certificatex) : [],
        contactData: contact ? JSON.parse(contact) : null,
      });
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading resume data:', error);
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return <div className='text-center p-8'>Loading resume data...</div>;
  }

  const handleDownloadPDF = () => {
    try {
      generateResumePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check console for details.');
    }
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
          {/* Personal information */}
          <div className='flex justify-around'>
            <div className='w-3/12'>
              <div className='mb-6 flex justify-center md:justify-start'>
                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden'>
                  {resumeData.contactData?.profilePhoto?.data && (
                    <Image
                      src={
                        resumeData.contactData.profilePhoto.data ||
                        '/placeholder.svg'
                      }
                      alt='Profile'
                      className='w-full h-full object-cover'
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='w-9/12'>
              <div>
                <h2 className='font-bold text-gray-900 mb-1 text-center md:text-left text-5xl'>
                  {resumeData?.personal?.firstName}{' '}
                  {resumeData?.personal?.lastName}
                </h2>
                <p className='text-gray-600 text-lg text-center md:text-left mb-2'>
                  {resumeData?.careear?.jobTitle}
                </p>
              </div>
              <div className='flex justify-start gap-10'>
                <p className='text-gray-600 text-sm text-center md:text-left'>
                  <span className='font-bold'>Phone</span>:{' '}
                  {resumeData?.personal?.phoneNumber}
                </p>
                <p className='text-gray-600 text-sm text-center md:text-left mb-2'>
                  <span className='font-bold'>Email</span>:{' '}
                  {resumeData?.personal?.email}
                </p>
              </div>
              <div className='text-gray-600 text-sm text-center md:text-left mb-8'>
                <span className='font-bold'>Address</span>:{' '}
                {`${resumeData?.personal?.address}, ${resumeData?.personal?.city}, ${resumeData?.personal?.country}`}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Left Sidebar */}
            <div className='md:col-span-1'>
              {/* Portfolio Section */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>
                  PORTFOLIO
                </h3>
                <ul className='space-y-2'>
                  {resumeData.contactData?.personalWebsite && (
                    <li>
                      <Link
                        href={resumeData.contactData.personalWebsite}
                        className='text-blue-600 hover:underline text-xs'>
                        portfolio
                      </Link>
                    </li>
                  )}
                  {resumeData.contactData?.linkedinProfile && (
                    <li>
                      <Link
                        href={resumeData.contactData.linkedinProfile}
                        className='text-blue-600 hover:underline text-xs'>
                        linkedin
                      </Link>
                    </li>
                  )}
                  {resumeData.contactData?.socialMediaUrl && (
                    <li>
                      <a
                        href={resumeData.contactData.socialMediaUrl}
                        className='text-blue-600 hover:underline text-xs'>
                        Social Media
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Skills Section */}
              {resumeData?.experience?.skills &&
                resumeData.experience.skills.length > 0 && (
                  <div className='mb-6'>
                    <h3 className='text-sm font-bold text-gray-900 mb-3'>
                      SKILLS
                    </h3>
                    <ul className='space-y-1 text-xs text-gray-700'>
                      {resumeData.experience.skills.map((sk) => (
                        <li key={sk}>{sk}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Right Content */}
            <div className='md:col-span-3'>
              {/* About Me */}
              {resumeData?.careear?.careerSummary && (
                <div className='mb-6'>
                  <h3 className='text-sm font-bold text-gray-900 mb-2'>
                    ABOUT ME
                  </h3>
                  <p className='text-[13px] text-gray-700 leading-relaxed'>
                    {resumeData.careear.careerSummary}
                  </p>
                </div>
              )}

              {/* Education Qualification */}
              {resumeData?.educationer && resumeData.educationer.length > 0 && (
                <div className='mb-6'>
                  <h3 className='text-sm font-bold text-gray-900 mb-2'>
                    EDUCATION QUALIFICATION
                  </h3>
                  {resumeData.educationer.map((edu) => (
                    <div
                      key={edu.id}
                      className='mb-3 flex gap-2'>
                      <p className='text-xs font-semibold text-gray-900'>
                        {edu.degree} -
                      </p>
                      <p className='text-xs text-gray-700'>{edu.institution}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Work Experience */}
              {resumeData?.experience?.jobTitle && (
                <div>
                  <h3 className='text-sm font-bold text-gray-900 mb-2'>
                    WORK EXPERIENCE
                  </h3>
                  <div className='mb-4'>
                    <p className='text-xs font-semibold text-gray-900 mb-1'>
                      {resumeData.experience.jobTitle}
                    </p>
                    <p className='text-xs text-gray-700 mb-1'>
                      {resumeData.experience.companyName} |{' '}
                      {resumeData.experience.startDate} -{' '}
                      {resumeData.experience.endDate}
                    </p>
                    <p className='text-xs text-gray-700 leading-relaxed'>
                      {resumeData.experience.jobDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 pt-8'>
          <Button
            variant='outline'
            className='flex-1 bg-transparent'>
            ← Back
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className='flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2'>
            <Download size={18} />
            Download PDF
          </Button>
          <Button className='flex-1 bg-green-600 hover:bg-green-700 text-white'>
            Submit Resume →
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-4 mt-8'>
        <Button
          variant='outline'
          className='flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg text-base h-auto border-0'>
          Back
        </Button>
        <Button className='flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-base h-auto'>
          Next
        </Button>
      </div>
    </div>
  );
}
