import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { fetchProducts } from "../api/products";
import type { Product } from "../types";

export interface UseProductsResult {
  products: Product[];
  spotlight: Product | null;
  showcase: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadProducts = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setIsLoading(true);
      const data = await fetchProducts({ signal: controller.signal });
      setProducts(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
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
