import React from 'react';
import type { IconType } from 'react-icons';

interface SkillIconProps {
  Icon: IconType;
  name: string;
  color?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ Icon, name, color }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Icon className={`text-5xl mb-3 ${color || 'text-white'}`} />
      <span className="text-gray-700 dark:text-gray-300 text-center font-medium">{name}</span>
    </div>
  );
}; 