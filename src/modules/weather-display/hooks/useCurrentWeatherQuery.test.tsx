import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { useCurrentWeatherQuery } from "./useCurrentWeatherQuery";
import { WeatherFetchError } from "../api/errors";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useCurrentWeatherQuery", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns mapped weather data for known coordinates", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
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
        }),
        { status: 200 },
      ),
    );

    const { result } = renderHook(
      () => useCurrentWeatherQuery({ latitude: 52.52, longitude: 13.41 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
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

  it("surfaces an error state on a failed/malformed response", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("", { status: 500 }));

    const { result } = renderHook(
      () => useCurrentWeatherQuery({ latitude: 52.52, longitude: 13.41 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(WeatherFetchError);
  });
});
