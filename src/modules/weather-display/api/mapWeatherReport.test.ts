import { describe, expect, it } from "vitest";
import { mapWeatherReport } from "./mapWeatherReport";
import { WeatherFetchError } from "./errors";
import type { OpenMeteoCurrentWeatherResponse } from "./types";

describe("mapWeatherReport", () => {
  it("maps a valid Open-Meteo response to a WeatherReport", () => {
    const response: OpenMeteoCurrentWeatherResponse = {
      latitude: 52.52,
      longitude: 13.41,
      current_weather: {
        temperature: 18.3,
        windspeed: 12.1,
        winddirection: 270,
        weathercode: 3,
        is_day: 1,
        time: "2026-11-10T12:00",
      },
    };

    expect(mapWeatherReport(response)).toEqual({
      latitude: 52.52,
      longitude: 13.41,
      temperatureC: 18.3,
      windSpeedKmh: 12.1,
      windDirectionDeg: 270,
      weatherCode: 3,
      isDay: true,
      observedAt: "2026-11-10T12:00",
    });
  });

  it("throws WeatherFetchError when current_weather is missing", () => {
    const response = {
      latitude: 52.52,
      longitude: 13.41,
    } as OpenMeteoCurrentWeatherResponse;

    expect(() => mapWeatherReport(response)).toThrow(WeatherFetchError);
  });

  it("throws WeatherFetchError when current_weather fields are malformed", () => {
    const response = {
      latitude: 52.52,
      longitude: 13.41,
      current_weather: {
        temperature: "warm",
        windspeed: 12.1,
        winddirection: 270,
        weathercode: 3,
        is_day: 1,
        time: "2026-11-10T12:00",
      },
    } as unknown as OpenMeteoCurrentWeatherResponse;

    expect(() => mapWeatherReport(response)).toThrow(WeatherFetchError);
  });
});
