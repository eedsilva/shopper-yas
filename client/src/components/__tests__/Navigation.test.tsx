import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Navigation from "../Navigation";
import { NavigationActions } from "../navigation";

afterEach(() => {
  cleanup();
});

describe("Navigation", () => {
  it("renders the brand link and menu", () => {
    render(<Navigation />);

    expect(screen.getByRole("link", { name: /shopper yas/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });

  it("exposes navigation actions as a named export", () => {
    render(<NavigationActions />);

    expect(screen.getByRole("button", { name: /open search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view favorites/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /shop the drop/i })).toBeInTheDocument();
  });
});
