export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    humidity: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    is_day: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    chance_of_rain: number;
    maxwind_kph: number;
    avghumidity: number;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: HourlyWeather[];
}

export interface HourlyWeather {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
  wind_kph: number;
  humidity: number;
}

export interface WeatherInsight {
  id: string;
  title: string;
  description: string;
  icon: string;
  severity: 'low' | 'medium' | 'high';
}