import React from 'react';
import { AppCard, type AppData } from './AppCard';

interface AppGridProps {
  apps: AppData[];
}

export const AppGrid: React.FC<AppGridProps> = ({ apps }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map(app => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}; 