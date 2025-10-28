import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import Navigation from "../Navigation";
import { NavigationActions } from "../navigation/";
import { CartProvider } from "../../contexts/CartContext";
import { LocalizationProvider } from "../../contexts/LocalizationContext";

afterEach(() => {
  cleanup();
});

describe("Navigation", () => {
  it("renders the brand link and menu", () => {
    render(
      <LocalizationProvider>
        <CartProvider>
          <MemoryRouter>
            <Navigation />
          </MemoryRouter>
        </CartProvider>
      </LocalizationProvider>
    );

    expect(screen.getByRole("link", { name: /shopper yas/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });

  it("exposes navigation actions as a named export", () => {
    render(
      <LocalizationProvider>
        <CartProvider>
          <MemoryRouter>
            <NavigationActions />
          </MemoryRouter>
        </CartProvider>
      </LocalizationProvider>
    );

    expect(screen.getByRole("combobox", { name: /language/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open admin console/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view cart/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /shop the drop/i })).toBeInTheDocument();
  });
});
