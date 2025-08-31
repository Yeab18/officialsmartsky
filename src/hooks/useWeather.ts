import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types/weather';
import { weatherApi, WeatherApiError } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>('');

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherApi.getCurrentWeather(city);
      setWeatherData(data);
      setLastSearchedCity(city);
      
      // Save to localStorage
      localStorage.setItem('smartsky-last-city', city);
      
      // Add to recent searches
      const recentSearches = JSON.parse(localStorage.getItem('smartsky-recent-searches') || '[]');
      const updatedSearches = [city, ...recentSearches.filter((s: string) => s !== city)].slice(0, 5);
      localStorage.setItem('smartsky-recent-searches', JSON.stringify(updatedSearches));
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentLocationWeather = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await weatherApi.getCurrentLocationWeather(latitude, longitude);
          setWeatherData(data);
          setLastSearchedCity(`${data.location.name}, ${data.location.country}`);
        } catch (err) {
          if (err instanceof WeatherApiError) {
            setError(err.message);
          } else {
            setError('Failed to get weather for your location.');
          }
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to access your location. Please search for a city manually.');
        setLoading(false);
      }
    );
  }, []);

  const refreshWeather = useCallback(() => {
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
    }
  }, [lastSearchedCity, fetchWeather]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!weatherData) return;
    
    const interval = setInterval(refreshWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [weatherData, refreshWeather]);

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('smartsky-last-city');
    if (lastCity) {
      fetchWeather(lastCity);
    } else {
      fetchCurrentLocationWeather();
    }
  }, [fetchWeather, fetchCurrentLocationWeather]);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    fetchCurrentLocationWeather,
    refreshWeather,
    lastSearchedCity
  };
};