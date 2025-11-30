import ProgreesingBar from '@/components/ProgreesingBar';
import PersonalInformationForm from './_component/PersonalInformationForm';

export default function PersonalInfoForm() {
  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      <ProgreesingBar />
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Tell Us About Yourself
        </h1>
        <p className='text-gray-600 text-sm'>
          Fill in your personal details so we can tailor your resume perfectly
          to your career goals.
        </p>
      </div>

      {/* Form */}
      <PersonalInformationForm />
      {/* Navigation Buttons */}
    </div>
  );
}

//  <Link
//    href='https://www.linkedin.com/in/sharif-miah'
//    className='flex-1 h-11 bg-green-500 hover:bg-green-500 flex justify-center'>
//    <Button
//      type='submit'
//      className='flex-1 h-11 bg-green-500 hover:bg-green-500 '>
//      Next →
//    </Button>
//  </Link>;
