import ProgreesingBar from '@/components/ProgreesingBar';
import CareerForm from './_components/CareerForm';
import CareerProgrssbar from './_components/CareerProgrssbar';

export default function CareerOverviewForm() {
  return (
    <div className='space-y-8 w-10/12 mx-auto'>
      <CareerProgrssbar />
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Your Career Overview
        </h1>
        <p className='text-gray-600 text-sm'>
          A strong career summary will make a lasting impression on recruiters.
          Lets create a summary that highlights your experience and goals.
        </p>
      </div>

      <CareerForm />
    </div>
  );
}
