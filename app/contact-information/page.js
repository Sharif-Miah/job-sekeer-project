import ContactInformationForm from './_component/ContactInformationForm';
import ContactPrograsingBar from './_component/ContactPrograsingBar';

export default function ContactInfoForm() {
  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      {/* Header */}
      <ContactPrograsingBar />
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Your Contact Information
        </h1>
        <p className='text-gray-600 text-sm'>
          Include additional contact details and social media links to showcase
          your professional presence.
        </p>
      </div>

      {/* Form */}
      <ContactInformationForm />
      {/* Navigation Buttons */}
    </div>
  );
}
