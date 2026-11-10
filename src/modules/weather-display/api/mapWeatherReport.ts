import { WeatherFetchError } from "./errors";
import type { OpenMeteoCurrentWeatherResponse, WeatherReport } from "./types";

export function mapWeatherReport(
  response: OpenMeteoCurrentWeatherResponse,
): WeatherReport {
  const current = response.current_weather;

  if (
    !current ||
    typeof current.temperature !== "number" ||
    typeof current.windspeed !== "number" ||
    typeof current.winddirection !== "number" ||
    typeof current.weathercode !== "number" ||
    typeof current.is_day !== "number" ||
    typeof current.time !== "string"
  ) {
    throw new WeatherFetchError("Weather service returned a malformed response");
  }

  return {
    latitude: response.latitude,
    longitude: response.longitude,
    temperatureC: current.temperature,
    windSpeedKmh: current.windspeed,
    windDirectionDeg: current.winddirection,
    weatherCode: current.weathercode,
    isDay: current.is_day === 1,
    observedAt: current.time,
  };
}
