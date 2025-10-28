import { clsx } from "clsx";

import type { Product, ProductTileVariant } from "../types";
import { ProductTileContent, ProductTileMedia } from "./product";

interface ProductTileProps {
  product: Product | null;
  variant?: ProductTileVariant;
}

function ProductTile({ product, variant }: ProductTileProps): JSX.Element | null {
  if (!product) return null;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(product.price ?? 0);

  return (
    <article
      className={clsx("product-tile", {
        "product-tile--spotlight": variant === "spotlight"
      })}
    >
      <ProductTileMedia image={product.image} name={product.name} />
      <ProductTileContent product={product} price={price} variant={variant} />
    </article>
  );
}

export default ProductTile;
