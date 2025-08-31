import React from 'react';
import { HourlyWeather } from '../types/weather';

interface HourlyForecastProps {
  hourlyData: HourlyWeather[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const next24Hours = hourlyData.slice(0, 24);

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Hourly Forecast</h3>
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6">
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4" style={{ minWidth: '1200px' }}>
            {next24Hours.map((hour, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-16 text-center"
              >
                <div className="text-xs text-slate-400 mb-2">
                  {formatTime(hour.time)}
                </div>
                
                <img 
                  src={`https:${hour.condition.icon}`}
                  alt={hour.condition.text}
                  className="w-8 h-8 mx-auto mb-2"
                />
                
                <div className="text-sm font-semibold text-white mb-1">
                  {Math.round(hour.temp_c)}°
                </div>
                
                {hour.chance_of_rain > 0 && (
                  <div className="text-xs text-blue-400">
                    {hour.chance_of_rain}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};