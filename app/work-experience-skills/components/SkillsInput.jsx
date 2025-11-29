'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function SkillsInput({ onAddSkill }) {
  const [input, setInput] = useState('');

  const handleAddSkill = () => {
    if (input.trim()) {
      onAddSkill(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className='flex gap-2'>
      <Input
        placeholder='e.g., JavaScript, React'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className='h-10'
      />
      <Button
        type='button'
        size='icon'
        onClick={handleAddSkill}
        variant='outline'>
        <Plus size={18} />
      </Button>
    </div>
  );
}
