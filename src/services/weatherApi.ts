const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

export class WeatherApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const weatherApi = {
  async getCurrentWeather(city: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=yes&alerts=yes`
      );
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new WeatherApiError('City not found. Please check the spelling and try again.', 400);
        }
        throw new WeatherApiError('Failed to fetch weather data. Please try again later.', response.status);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }
      throw new WeatherApiError('Network error. Please check your internet connection.');
    }
  },

  async getCurrentLocationWeather(lat: number, lon: number) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=yes`
      );
      
      if (!response.ok) {
        throw new WeatherApiError('Failed to fetch weather data for your location.', response.status);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }
      throw new WeatherApiError('Network error. Please check your internet connection.');
    }
  }
};
