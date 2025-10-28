import { useTranslation } from "react-i18next";
import { useProducts } from "../hooks/useProducts";
import {
  ProductsEmptyState,
  ProductsErrorState,
  ProductsGrid,
  ProductsSectionHeader
} from "./products";

function ProductShowcase() {
  const { t } = useTranslation();
  const { spotlight, showcase, isLoading, error, refetch, products } = useProducts();

  return (
    <section className="products" id="new-arrivals" aria-live="polite">
      <ProductsSectionHeader
        eyebrow={t("products.section.eyebrow")}
        title={t("products.section.title")}
        ctaLabel={t("products.section.cta")}
        onCtaClick={() => window.open("/collections", "_self")}
      />

      <ProductsErrorState message={error} onRetry={refetch} />
      <ProductsEmptyState visible={!isLoading && products.length === 0} />

      <ProductsGrid isLoading={isLoading} products={showcase} spotlight={spotlight} />
    </section>
  );
}

export default ProductShowcase;
