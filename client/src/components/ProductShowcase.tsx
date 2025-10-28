import { useProducts } from "../hooks/useProducts";
import {
  ProductsEmptyState,
  ProductsErrorState,
  ProductsGrid,
  ProductsSectionHeader
} from "./products";

function ProductShowcase(): JSX.Element {
  const { spotlight, showcase, isLoading, error, refetch, products } = useProducts();

  return (
    <section className="products" id="new-arrivals" aria-live="polite">
      <ProductsSectionHeader
        eyebrow="New arrivals"
        title="Tailored for the season ahead"
        ctaLabel="View all products"
        onCtaClick={() => window.open("/collections", "_self")}
      />

      <ProductsErrorState message={error} onRetry={() => void refetch()} />
      <ProductsEmptyState visible={!isLoading && products.length === 0} />

      <ProductsGrid isLoading={isLoading} products={showcase} spotlight={spotlight} />
    </section>
  );
}

export default ProductShowcase;
