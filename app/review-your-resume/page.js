'use client';

import { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';

import Image from 'next/image';
import ImagePerson from '@/public/download.jpg';
import ProgreesingBar from '@/components/ProgreesingBar';
import ReviewProgress from './_component/ReviewProgress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { generateResumePDF } from '@/utils/utils';
import { jsPDF } from 'jspdf';

export default function ReviewResumeForm() {
  const [resumeData, setResumeData] = useState({
    personalData: '',
    careearData: '',
    workExperience: '',
    educationexpe: [''],
    certificate: [],
    contactInfo: '',
  });

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

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
        educationer: educationexpe ? JSON.parse(educationexpe) : null,
        certi: certificatex ? JSON.parse(certificatex) : null,
        contactData: contact ? JSON.parse(contact) : null,
      });
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading resume data:', error);
      setIsLoaded(true);
    }
  }, []);

  console.log(resumeData.contactData);

  if (!isLoaded) {
    return <div className='text-center p-8'>Loading resume data...</div>;
  }

  const handleEdit = () => {
    // Edit functionality would be implemented here
    console.log('Edit resume');
  };

  const handleDownload = () => {
    const pdf = new jsPDF();

    pdf.text('Hello Sharif!', 10, 10);
    pdf.text('This is your generated PDF file.', 10, 20);

    pdf.save('my-file.pdf');
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
        <div
          ref={targetRef}
          className='border border-gray-300 rounded-lg p-8 md:p-12 mb-8 bg-white'>
          {/* Personal information */}

          <div className='flex justify-around'>
            <div className='w-3/12'>
              <div className='mb-6 flex justify-center md:justify-start'>
                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden'>
                  <Image
                    src={resumeData.contactData.profilePhoto.data}
                    alt='Profile'
                    className='w-full h-full object-cover'
                    width={100}
                    height={100}
                  />
                </div>
              </div>

              {/* Name */}
            </div>
            <div className='w-9/12'>
              <div>
                <h2 className=' font-bold text-gray-900 mb-1 text-center md:text-left text-5xl my-4'>
                  {resumeData?.personal?.firstName}{' '}
                  {resumeData?.personal?.lastName}
                </h2>
                <p className='text-gray-600 text-lg text-center md:text-left mb-2'>
                  {resumeData?.careear?.jobTitle}
                </p>
              </div>
              <div className='flex   justify-start gap-10 mt-4'>
                <p className='text-gray-600 text-sm text-center md:text-left '>
                  <span className='font-bold'>Phone</span>:{' '}
                  {resumeData?.personal?.phoneNumber}
                </p>
                <p className='text-gray-600 text-sm text-center md:text-left mb-2'>
                  <span className='font-bold'>Email</span>:{' '}
                  {resumeData?.personal?.email}
                </p>
              </div>
              <div className='className=text-gray-600 text-sm text-center md:text-left mb-8'>
                <span className='font-bold'>Address </span>:{' '}
                {`${resumeData?.personal?.address},
                ${resumeData?.personal?.city}, ${resumeData?.personal?.country}`}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Left Sidebar */}
            <div className='md:col-span-1'>
              {/* Profile Picture */}

              {/* Portfolio Section */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>
                  PORTFOLIO
                </h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href={resumeData.contactData.personalWebsite}
                      className='text-blue-600 hover:underline text-xs'>
                      portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={resumeData.contactData.linkedinProfile}
                      className='text-blue-600 hover:underline text-xs'>
                      linkedin
                    </Link>
                  </li>
                  <li>
                    <a
                      href={resumeData.contactData.socialMediaUrl}
                      className='text-blue-600 hover:underline text-xs'>
                      Social Media
                    </a>
                  </li>
                </ul>
              </div>

              {/* Skills Section */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-3'>SKILLS</h3>
                <ul className='space-y-1 text-xs text-gray-700'>
                  {resumeData?.experience?.skills.map((sk) => (
                    <li key={sk}>{sk}</li>
                  ))}
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
                <p className='text-[13px] text-gray-700 leading-relaxed'>
                  {resumeData?.careear?.careerSummary}
                </p>
              </div>

              {/* Education Qualification */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  EDUCATION QUALIFICATION
                </h3>
                {resumeData?.educationer.map((edu) => (
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

              {/* Training/Certification */}
              <div className='mb-6'>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  TRAINING/CERTIFICATION
                </h3>
                <ul className='space-y-1 text-xs text-gray-700'>
                  <div className='mb-3 flex gap-2'>
                    <p className='text-xs font-semibold text-gray-900'>
                      {resumeData?.experience?.achievements}
                    </p>
                  </div>
                </ul>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className='text-sm font-bold text-gray-900 mb-2'>
                  WORK EXPERIENCE
                </h3>
                <div className='mb-4'>
                  <p className='text-xs font-semibold text-gray-900 mb-1'>
                    {resumeData?.experience?.jobTitle}
                  </p>
                  <p className='text-xs text-gray-700 mb-1'>
                    {resumeData?.experience?.companyName} |{' '}
                    {resumeData?.experience?.startDate} -{' '}
                    {resumeData?.experience?.endDate}
                  </p>
                  <p className='text-xs text-gray-700 leading-relaxed'>
                    {resumeData?.experience?.jobDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4'>
          <div>
            {/* Action Buttons */}
            <div className='flex gap-4 pt-8'>
              <Button
                variant='outline'
                className='flex-1 bg-transparent'>
                ← Back
              </Button>
              <Button
                onClick={() => toPDF()}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2'>
                <Download size={18} />
                Download PDF
              </Button>
              <Button className='flex-1 bg-green-600 hover:bg-green-700 text-white'>
                Submit Resume →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-4 mt-8'>
        <Link
          href='/ai-resume'
          className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
          <Button
            type='submit'
            className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
            ← Back
          </Button>
        </Link>
        <Link
          href='https://www.linkedin.com/in/sharif-miah'
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
