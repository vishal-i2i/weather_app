import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppProviders } from "./AppProviders";

describe("AppProviders", () => {
  it("renders the composed application without throwing", () => {
    render(<AppProviders />);

    expect(screen.getByRole("main", { name: "Weather Widget" })).toBeInTheDocument();
  });
});
