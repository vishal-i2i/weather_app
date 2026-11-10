import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../api/openMeteoClient";
import { mapWeatherReport } from "../api/mapWeatherReport";
import type { Coordinates, WeatherReport } from "../api/types";
import type { WeatherFetchError } from "../api/errors";

export function useCurrentWeatherQuery(coordinates: Coordinates) {
  return useQuery<WeatherReport, WeatherFetchError>({
    queryKey: ["weather", "current", coordinates.latitude, coordinates.longitude],
    queryFn: async ({ signal }) => {
      const response = await fetchCurrentWeather(coordinates, { signal });
      return mapWeatherReport(response);
    },
  });
}
