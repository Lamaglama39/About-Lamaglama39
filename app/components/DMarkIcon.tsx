import type { ReactNode } from "react";

interface DMarkIconProps {
  className?: string;
}

export const DMarkIcon = ({ className = "" }: DMarkIconProps): ReactNode => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <h1 className="text-4xl font-bold">D</h1>
    </div>
  );
}; 