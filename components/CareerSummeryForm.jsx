'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const CareerSummeryForm = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/work-experience-skills');
  };

  return (
    <div className='p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900'>
      <form>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 my-8'>
          <div>
            <Label className='mb-2 block'>Job Title :</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Country' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='bangladesh'>Bangladesh</SelectItem>
                <SelectItem value='india'>India</SelectItem>
                <SelectItem value='nepal'>Nepal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Textarea placeholder='Type your message here.' />

        {/*end grid*/}
        {/*end row*/}
        <div className='grid lg:grid-cols-2 grid-cols-1 mt-4  gap-5'>
          <Button
            className='mt-5 w-full cursor-pointer bg-gray-400 hover:bg-gray-500'
            asChild>
            <input
              type='submit'
              name='back'
              value='Back'
            />
          </Button>
          <Button
            onClick={() => handleClick()}
            className='mt-5 w-full cursor-pointer bg-green-500 hover:bg-green-600'
            asChild>
            <input
              type='submit'
              name='next'
              value='Next'
            />
          </Button>
        </div>
      </form>
      {/*end form*/}
    </div>
  );
};

export default CareerSummeryForm;
