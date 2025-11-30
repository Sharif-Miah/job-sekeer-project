import React from 'react';

const ReviewProgress = () => {
  return (
    <div className='my-5'>
      <div className='flex '>
        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>01</span>
        </div>
        <div className='border-t-4 border-green-500 w-40 mt-[12px]'></div>
        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>02</span>
        </div>
        <div className='border-t-4 border-green-500 w-40 mt-[12px]'></div>

        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>03</span>
        </div>
        <div className='border-t-4 border-green-500 w-40 mt-[12px]'></div>
        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>04</span>
        </div>
        <div className='border-t-4 border-green-500 w-40 mt-[12px]'></div>
        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>05</span>
        </div>
        <div className='border-t-4 border-green-500 w-40 mt-[12px]'></div>
        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>06</span>
        </div>
        <div className='border-t-4 border-green-500 w-40 mt-[12px]'></div>
        <div className=' flex justify-center items-center bg-green-500  text-white w-[35px] mt-[-3px] h-[35px] p-3 rounded-full text-sm font-bold'>
          <span>07</span>
        </div>
      </div>
      <ul className='flex justify-center items-center gap-10  mt-1'>
        <li className='list-none cursor-pointer '>Personal Information</li>
        <li className='list-none text-green-500'>Career Summary</li>
        <li className='list-none cursor-pointer'>Skills & Experience</li>
        <li className='list-none cursor-pointer'>Education & Certifications</li>
        <li className='list-none'>Contact Information</li>
        <li className='list-none cursor-pointer'>AI Resume Generation</li>
        <li className='list-none cursor-pointer'>Review & Download</li>
      </ul>
    </div>
  );
};

export default ReviewProgress;
