import Image from 'next/image';
import Resume from '@/public/resume.jpg';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className='mb-16 '>
      <div className='grid md:grid-cols-2 gap-8 items-center'>
        <div>
          <Image
            src={Resume}
            alt='Mighty Super Cheesecake'
            className='w-full h-[450px] object-cover rounded-lg'
            width={100}
            height={100}
          />
        </div>
        <div>
          <h1 className='text-6xl font-bold mb-4'>
            Create Your{' '}
            <span className='text-green-500'>AI-Powered Resume</span>
          </h1>
          <p className='text-lg text-black mb-4'>
            Let our AI technology help you build a professional resume tailored
            to your skills, experience, and career goals.
          </p>
          <p className='text-[#777] mb-4 text-sm font-bold'>
            Follow these simple steps to create a standout resume that will get
            <br /> you noticed by top employers.
          </p>
          <Link
            href='/personal-information'
            className='bg-green-500 text-white px-7 py-2 rounded font-bold  inline-block'>
            Start Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
