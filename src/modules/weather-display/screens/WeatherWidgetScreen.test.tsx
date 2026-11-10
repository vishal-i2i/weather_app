import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { WeatherWidgetScreen } from "./WeatherWidgetScreen";

describe("routing", () => {
  it("resolves the default route (\"/\") to the Weather Widget screen", () => {
    const router = createMemoryRouter(
      [{ path: "/", element: <WeatherWidgetScreen /> }],
      { initialEntries: ["/"] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: "Weather Widget" })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: "Weather Widget" })).toBeInTheDocument();
  });
});
