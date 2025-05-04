import React from 'react';
import type { IconType } from 'react-icons';

interface ContactIconProps {
  Icon: IconType | React.ReactNode;
  url: string;
  bgColor?: string;
  iconColor?: string;
}

export const ContactIcon: React.FC<ContactIconProps> = ({ 
  Icon, 
  url, 
  bgColor = 'bg-gray-100', 
  iconColor = 'text-black' 
}) => {
  const IconComponent = typeof Icon === 'function' ? (
    <Icon className={`text-4xl ${iconColor}`} />
  ) : (
    Icon
  );
  
  return (
    <div className={`w-16 h-16 flex items-center justify-center ${bgColor} rounded-full hover:scale-110 transition-transform duration-300`}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
        {IconComponent}
      </a>
    </div>
  );
}; 