import React, { useState } from 'react';

interface CareerItemProps {
  period: string;
  company: string;
  details?: string[];
}

export const CareerItem: React.FC<CareerItemProps> = ({ period, company, details = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4">
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="mr-2">
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          {period} - {company}
        </p>
      </div>
      
      {isOpen && details.length > 0 && (
        <div className="mt-2 pl-6 border-l-2 border-gray-300 dark:border-gray-600 ml-1">
          <ul className="list-disc pl-4 text-sm text-gray-500 dark:text-gray-400 space-y-1">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 