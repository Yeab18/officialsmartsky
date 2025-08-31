import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { ForecastCards } from './ForecastCards';
import { HourlyForecast } from './HourlyForecast';
import { WeatherInsights } from './WeatherInsights';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

export const WeatherDashboard: React.FC = () => {
  const { 
    weatherData, 
    loading, 
    error, 
    fetchWeather, 
    fetchCurrentLocationWeather, 
    refreshWeather 
  } = useWeather();

  if (loading && !weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Search bar */}
      <SearchBar
        onSearch={fetchWeather}
        onCurrentLocation={fetchCurrentLocationWeather}
        onRefresh={refreshWeather}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={() => fetchCurrentLocationWeather()} 
        />
      )}

      {/* Weather Data */}
      {weatherData && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6">
          {/* Current weather - spans 2 columns on desktop */}
          <div className="lg:col-span-2">
            <CurrentWeather data={weatherData} />
          </div>

          {/* Forecast cards - full width on desktop */}
          <div className="lg:col-span-3">
            <ForecastCards forecast={weatherData.forecast.forecastday} />
          </div>

          {/* Hourly Forecast - full width */}
          <div className="lg:col-span-3">
            <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
          </div>

          {/* Weather Insights - full width */}
          <div className="lg:col-span-3">
            <WeatherInsights data={weatherData} />
          </div>
        </div>
      )}

      {/* Empty state */}
      {!weatherData && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg mb-4">
            Welcome to <span className="font-semibold text-blue-400">SmartSky</span> Weather Dashboard
          </div>
          <p className="text-slate-500">
            Search for a city or use your current location to get started.
          </p>
        </div>
      )}
    </div>
  );
};
