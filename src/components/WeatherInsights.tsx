import React from 'react';
import { WeatherData, WeatherInsight } from '../types/weather';
import { 
  Sun, 
  Umbrella, 
  Wind, 
  Droplets, 
  Eye, 
  Sunrise,
  Sunset,
  AlertTriangle
} from 'lucide-react';

interface WeatherInsightsProps {
  data: WeatherData;
}

export const WeatherInsights: React.FC<WeatherInsightsProps> = ({ data }) => {
  const { current, forecast } = data;
  const today = forecast.forecastday[0];

  const generateInsights = (): WeatherInsight[] => {
    const insights: WeatherInsight[] = [];

    // UV Index insight
    if (current.uv >= 8) {
      insights.push({
        id: 'uv-high',
        title: 'High UV Index',
        description: 'Use sunscreen and limit outdoor exposure',
        icon: 'sun',
        severity: 'high'
      });
    } else if (current.uv >= 6) {
      insights.push({
        id: 'uv-moderate',
        title: 'Moderate UV Index',
        description: 'Consider sunscreen for extended outdoor activities',
        icon: 'sun',
        severity: 'medium'
      });
    }

    // Rain chance
    if (today.day.chance_of_rain >= 70) {
      insights.push({
        id: 'rain-high',
        title: 'High Rain Chance',
        description: 'Bring an umbrella or raincoat',
        icon: 'umbrella',
        severity: 'high'
      });
    } else if (today.day.chance_of_rain >= 30) {
      insights.push({
        id: 'rain-moderate',
        title: 'Possible Rain',
        description: 'Consider bringing an umbrella',
        icon: 'umbrella',
        severity: 'medium'
      });
    }

    // Wind conditions
    if (current.wind_kph >= 30) {
      insights.push({
        id: 'wind-strong',
        title: 'Strong Winds',
        description: 'Secure loose objects and be cautious outdoors',
        icon: 'wind',
        severity: 'high'
      });
    }

    // Humidity insight
    if (current.humidity >= 80) {
      insights.push({
        id: 'humidity-high',
        title: 'High Humidity',
        description: 'It may feel warmer than the actual temperature',
        icon: 'droplets',
        severity: 'medium'
      });
    } else if (current.humidity <= 30) {
      insights.push({
        id: 'humidity-low',
        title: 'Low Humidity',
        description: 'Stay hydrated and use moisturizer',
        icon: 'droplets',
        severity: 'medium'
      });
    }

    // Visibility
    if (current.vis_km < 5) {
      insights.push({
        id: 'visibility-poor',
        title: 'Poor Visibility',
        description: 'Drive carefully and use headlights',
        icon: 'eye',
        severity: 'high'
      });
    }

    // Sunrise/Sunset info
    insights.push({
      id: 'daylight',
      title: 'Daylight Hours',
      description: `Sunrise: ${today.astro.sunrise}, Sunset: ${today.astro.sunset}`,
      icon: 'sunrise',
      severity: 'low'
    });

    return insights;
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun': return Sun;
      case 'umbrella': return Umbrella;
      case 'wind': return Wind;
      case 'droplets': return Droplets;
      case 'eye': return Eye;
      case 'sunrise': return Sunrise;
      case 'sunset': return Sunset;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-blue-400 bg-blue-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const insights = generateInsights();

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Weather Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = getIcon(insight.icon);
          const colorClass = getSeverityColor(insight.severity);
          
          return (
            <div 
              key={insight.id}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-5 hover:from-slate-700/80 hover:to-slate-800/80 transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-xl ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};