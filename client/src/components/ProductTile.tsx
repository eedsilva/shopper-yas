import { clsx } from "clsx";
import type { KeyboardEvent } from "react";

import type { Product, ProductTileVariant } from "../types";
import { useLocalization } from "../contexts/LocalizationContext";
import { ProductTileContent, ProductTileMedia } from "./product";

interface ProductTileProps {
  product: Product | null;
  variant?: ProductTileVariant;
  onSelect?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  addLabel: string;
}

function ProductTile({ product, variant, onSelect, onAddToCart, addLabel }: ProductTileProps): JSX.Element | null {
  if (!product) return null;

  const { formatCurrency } = useLocalization();
  const price = formatCurrency(product.price ?? 0);

  const handleSelect = () => {
    onSelect?.(product);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <article
      className={clsx("product-tile", {
        "product-tile--spotlight": variant === "spotlight"
      })}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleSelect : undefined}
      onKeyDown={onSelect ? handleKeyDown : undefined}
    >
      <ProductTileMedia image={product.image} name={product.name} />
      <ProductTileContent
        product={product}
        price={price}
        variant={variant}
        onAddToCart={onAddToCart ? () => onAddToCart(product) : undefined}
        addLabel={addLabel}
      />
    </article>
  );
}

export default ProductTile;
