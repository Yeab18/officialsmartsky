import React from 'react';
import { WeatherData } from '../types/weather';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  Gauge, 
  Eye, 
  Sun 
} from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { location, current } = data;

  const weatherDetails = [
    {
      label: 'Feels like',
      value: `${Math.round(current.feelslike_c)}°C`,
      icon: Thermometer,
    },
    {
      label: 'Wind',
      value: `${Math.round(current.wind_kph)} km/h ${current.wind_dir}`,
      icon: Wind,
    },
    {
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: Droplets,
    },
    {
      label: 'Pressure',
      value: `${Math.round(current.pressure_mb)} mb`,
      icon: Gauge,
    },
    {
      label: 'Visibility',
      value: `${current.vis_km} km`,
      icon: Eye,
    },
    {
      label: 'UV Index',
      value: current.uv.toString(),
      icon: Sun,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {location.name}, {location.country}
          </h2>
          <p className="text-slate-400">{location.region}</p>
        </div>
        
        <div className="flex items-center mt-4 lg:mt-0">
          <img 
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="w-16 h-16 mr-4"
          />
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">
              {Math.round(current.temp_c)}°C
            </div>
            <div className="text-slate-300 text-sm">
              {current.condition.text}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {weatherDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div 
              key={index}
              className="bg-slate-900/40 rounded-xl p-4 text-center hover:bg-slate-900/60 transition-all duration-200"
            >
              <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-xs text-slate-400 mb-1">{detail.label}</div>
              <div className="text-sm font-semibold text-white">{detail.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};