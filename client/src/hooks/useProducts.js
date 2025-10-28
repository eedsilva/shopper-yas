import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef();

  const loadProducts = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setIsLoading(true);
      const data = await fetchProducts({ signal: controller.signal });
      setProducts(data);
      setError(null);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    return () => abortControllerRef.current?.abort();
  }, [loadProducts]);

  const spotlight = useMemo(() => products[0] ?? null, [products]);
  const showcase = useMemo(() => products.slice(1, 7), [products]);

  return {
    products,
    spotlight,
    showcase,
    isLoading,
    error,
    refetch: loadProducts
  };
}
