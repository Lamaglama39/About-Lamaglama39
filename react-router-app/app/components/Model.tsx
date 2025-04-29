import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default function Model() {
  return (
    <div className="w-full py-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <img 
            src="/space-lama.png" 
            alt="Space Lama" 
            className="h-28 md:h-36 w-auto object-contain transform-gpu transition-all duration-700 hover:scale-105" 
          />
        </div>
      </div>
    </div>
  );
}
