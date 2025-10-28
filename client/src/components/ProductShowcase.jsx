import { useEffect, useMemo, useState } from "react";
import ProductTile from "./ProductTile";
import ProductTileSkeleton from "./ProductTileSkeleton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const spotlight = useMemo(() => products[0], [products]);
  const rest = useMemo(() => products.slice(1, 7), [products]);

  return (
    <section className="products" id="new-arrivals" aria-live="polite">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">New arrivals</p>
          <h2>Tailored for the season ahead</h2>
        </div>
        <button type="button" className="section-cta">
          View all products
        </button>
      </div>

      {error && (
        <div className="products__error" role="alert">
          <p>We couldn\'t refresh the latest arrivals. {error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      <div className="products__grid">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => <ProductTileSkeleton key={index} />)}

        {!isLoading && spotlight && (
          <ProductTile product={spotlight} variant="spotlight" />
        )}

        {!isLoading &&
          rest.map((product) => <ProductTile key={product.id} product={product} />)}
      </div>
    </section>
  );
}

export default ProductShowcase;
