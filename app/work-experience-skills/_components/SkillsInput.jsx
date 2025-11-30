'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export default function SkillsInput({ onAddSkill }) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      onAddSkill(skillInput.trim());
      setSkillInput('');
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
        placeholder='e.g., React, TypeScript, Node.js'
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className='h-10'
      />
      <Button
        type='button'
        onClick={handleAddSkill}
        variant='outline'
        size='sm'
        className='whitespace-nowrap bg-transparent'>
        <Plus
          size={16}
          className='mr-1'
        />
        Add
      </Button>
    </div>
  );
}
