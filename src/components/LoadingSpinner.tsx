import React from 'react';
import { Cloud } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="relative mb-4">
          <Cloud className="w-16 h-16 text-blue-400 mx-auto animate-bounce" />
          <div className="absolute inset-0 w-16 h-16 mx-auto">
            <div className="w-full h-full border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-slate-400 text-lg font-medium">
          Loading weather data...
        </p>
      </div>
    </div>
  );
};