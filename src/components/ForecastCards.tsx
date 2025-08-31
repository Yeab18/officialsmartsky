import React from 'react';
import { ForecastDay } from '../types/weather';

interface ForecastCardsProps {
  forecast: ForecastDay[];
}

export const ForecastCards: React.FC<ForecastCardsProps> = ({ forecast }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-white mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(7,minmax(0,1fr))] gap-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-4 hover:from-slate-700/80 hover:to-slate-800/80 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <div className="text-sm font-medium text-slate-300 mb-2 truncate w-full">
              {formatDate(day.date)}
            </div>
            
            <img 
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-12 h-12 mx-auto mb-3"
            />
            
            <div className="text-xs text-slate-400 mb-2 min-h-[2rem] flex items-center justify-center text-center truncate w-full">
              {day.day.condition.text}
            </div>
            
            <div className="space-y-1">
              <div className="text-lg font-bold text-white">
                {Math.round(day.day.maxtemp_c)}°
              </div>
              <div className="text-sm text-slate-400">
                {Math.round(day.day.mintemp_c)}°
              </div>
            </div>
            
            {day.day.chance_of_rain > 0 && (
              <div className="mt-2 text-xs text-blue-400">
                {day.day.chance_of_rain}% rain
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
