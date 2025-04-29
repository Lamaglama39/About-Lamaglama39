import React from 'react';

export interface AppData {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  link: string;
  github: string;
}

interface AppCardProps {
  app: AppData;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {app.imageUrl ? (
          <img src={app.imageUrl} alt={app.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-4xl text-gray-400 dark:text-gray-500">🚀</div>
        )}
      </div>
      
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{app.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">{app.description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {app.technologies.map(tech => (
            <span key={tech} className="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <a 
            href={app.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded transition-colors"
          >
            アプリを見る
          </a>
          
          <a 
            href={app.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 rounded transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}; 