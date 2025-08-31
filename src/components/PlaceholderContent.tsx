import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderContentProps {
  title: string;
  description: string;
}

export const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="p-4 bg-slate-800/50 rounded-2xl mb-4 inline-block">
          <Construction className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};