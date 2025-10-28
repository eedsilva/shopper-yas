import { type ReactNode, useState } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { describe, expect, it } from "vitest";

import CartDrawer from "../cart/CartDrawer";
import ProductDetailsDrawer from "../ProductDetailsDrawer";
import { CartProvider, useCart } from "../../contexts/CartContext";
import { LocalizationProvider } from "../../contexts/LocalizationContext";
import { translations } from "../../i18n/translations";
import type { Product } from "../../types";

const productMessages = translations.en.productDetails;
const cartMessages = translations.en.cart;

const sampleProduct: Product = {
  id: 1,
  name: "Aurora Lamp",
  description: "A compact mood lamp with adaptive lighting.",
  price: 129,
  category: "Lighting",
  image: null,
  tags: ["smart", "ambient"],
  stock: 5,
  sold: 2,
  cost: 80,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
};

function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LocalizationProvider>{children}</LocalizationProvider>
    </MotionConfig>
  );
}

function ProductDrawerHarness(): JSX.Element {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <button type="button" onClick={() => setSelected(sampleProduct)}>
        Inspect product
      </button>
      <ProductDetailsDrawer
        product={selected}
        onClose={() => setSelected(null)}
        onAddToCart={() => undefined}
        messages={productMessages}
      />
    </>
  );
}

function CartDrawerHarness(): JSX.Element {
  const { openCart } = useCart();

  return (
    <>
      <button type="button" onClick={openCart}>
        View cart
      </button>
      <CartDrawer />
    </>
  );
}

describe("animated drawers", () => {
  it("keeps focus on actionable controls when the product drawer animates", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <ProductDrawerHarness />
      </Providers>
    );

    const trigger = screen.getByRole("button", { name: /inspect product/i });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: sampleProduct.name });
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = await screen.findByRole("button", { name: productMessages.close });
    expect(closeButton).toHaveFocus();

    await user.click(closeButton);
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("restores focus to the toggle after the cart drawer closes via keyboard", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <CartProvider>
          <CartDrawerHarness />
        </CartProvider>
      </Providers>
    );

    const trigger = screen.getByRole("button", { name: /view cart/i });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: cartMessages.title });
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = screen.getByRole("button", { name: cartMessages.close });
    expect(closeButton).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
