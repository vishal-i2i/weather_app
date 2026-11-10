export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OpenMeteoCurrentWeatherResponse {
  latitude: number;
  longitude: number;
  current_weather?: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

export interface WeatherReport {
  latitude: number;
  longitude: number;
  temperatureC: number;
  windSpeedKmh: number;
  windDirectionDeg: number;
  weatherCode: number;
  isDay: boolean;
  observedAt: string;
}
