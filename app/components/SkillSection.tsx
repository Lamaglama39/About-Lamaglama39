import React from 'react';
import { SkillIcon } from './SkillIcon';
import type { IconType } from 'react-icons';

interface Skill {
  Icon: IconType;
  name: string;
  color: string;
}

interface SkillSectionProps {
  skills: Skill[];
}

export const SkillSection: React.FC<SkillSectionProps> = ({ skills }) => {
  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-12 justify-items-center">
        {skills.map((skill, index) => (
          <SkillIcon 
            key={index} 
            Icon={skill.Icon} 
            name={skill.name} 
            color={skill.color} 
          />
        ))}
      </div>
    </>
  );
}; 