import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-red-500/20 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-200 text-sm mb-4">
              {message}
            </p>
          </div>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};