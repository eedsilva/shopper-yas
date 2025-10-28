import { useMemo, useState } from "react";

import { useCart } from "../contexts/CartContext";
import { useMessages } from "../contexts/LocalizationContext";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";
import ProductDetailsDrawer from "./ProductDetailsDrawer";
import {
  ProductsEmptyState,
  ProductsErrorState,
  ProductsGrid,
  ProductsSectionHeader
} from "./products";

const ALL_CATEGORIES = "__all__";

function ProductShowcase(): JSX.Element {
  const { products, isLoading, error, refetch } = useProducts();
  const { addToCart } = useCart();
  const messages = useMessages();
  const { products: productMessages, productTile } = messages;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    products.forEach((product) => unique.add(product.category));
    return [ALL_CATEGORIES, ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || product.category === selectedCategory;
      const matchesQuery =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [products, searchTerm, selectedCategory]);

  const spotlight = filteredProducts[0] ?? null;
  const showcase = spotlight ? filteredProducts.slice(1) : filteredProducts;

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => setSelectedProduct(null);

  const showEmptyState = !isLoading && products.length === 0;
  const showNoResults = !isLoading && products.length > 0 && filteredProducts.length === 0;

  return (
    <section className="products" id="new-arrivals" aria-live="polite">
      <ProductsSectionHeader
        eyebrow={productMessages.sectionEyebrow}
        title={productMessages.sectionTitle}
        ctaLabel={productMessages.sectionCta}
        onCtaClick={() => window.open("/collections", "_self")}
      />

      <div className="products__toolbar" role="search">
        <div className="products__search">
          <label htmlFor="product-search" className="sr-only">
            {productMessages.searchPlaceholder}
          </label>
          <input
            id="product-search"
            type="search"
            value={searchTerm}
            placeholder={productMessages.searchPlaceholder}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="products__categories" role="list">
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            const label =
              category === ALL_CATEGORIES ? productMessages.categoryAll : category;
            return (
              <button
                key={category}
                type="button"
                role="listitem"
                className="products__category"
                data-active={isActive}
                onClick={() => setSelectedCategory(category)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <ProductsErrorState
        message={error}
        description={productMessages.error}
        retryLabel={productMessages.retry}
        onRetry={() => void refetch()}
      />
      <ProductsEmptyState visible={showEmptyState} message={productMessages.emptyState} />
      <ProductsEmptyState visible={showNoResults} message={productMessages.noMatches} />

      <ProductsGrid
        isLoading={isLoading}
        products={showcase}
        spotlight={spotlight}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
        addLabel={productTile.addToCart}
      />

      <ProductDetailsDrawer
        product={selectedProduct}
        onClose={closeDetails}
        onAddToCart={handleAddToCart}
        messages={messages.productDetails}
      />
    </section>
  );
}

export default ProductShowcase;
