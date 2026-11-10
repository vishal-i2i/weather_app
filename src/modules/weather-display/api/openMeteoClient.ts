import { WeatherFetchError } from "./errors";
import type { Coordinates, OpenMeteoCurrentWeatherResponse } from "./types";

const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchCurrentWeather(
  coordinates: Coordinates,
  options?: { signal?: AbortSignal },
): Promise<OpenMeteoCurrentWeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    current_weather: "true",
  });

  let response: Response;
  try {
    response = await fetch(`${OPEN_METEO_FORECAST_URL}?${params.toString()}`, {
      signal: options?.signal,
    });
  } catch (cause) {
    throw new WeatherFetchError("Failed to reach the weather service", { cause });
  }

  if (!response.ok) {
    throw new WeatherFetchError(
      `Weather service responded with status ${response.status}`,
    );
  }

  return (await response.json()) as OpenMeteoCurrentWeatherResponse;
}
