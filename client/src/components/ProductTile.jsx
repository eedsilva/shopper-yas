import { clsx } from "clsx";
import { ProductTileContent, ProductTileMedia } from "./product";

function ProductTile({ product, variant }) {
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
