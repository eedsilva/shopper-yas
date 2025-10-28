import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { ProductTileContent, ProductTileMedia } from "./product";

function ProductTile({ product, variant }) {
  const { i18n } = useTranslation();
  if (!product) return null;

  const locale = i18n.resolvedLanguage ?? i18n.language ?? "en";

  const price = new Intl.NumberFormat(locale === "en" ? "en-US" : locale, {
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
