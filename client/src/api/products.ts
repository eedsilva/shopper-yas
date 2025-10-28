import type { Product } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type RequestOptions = {
  signal?: AbortSignal;
};

async function request<TResponse>(path: string, { signal }: RequestOptions = {}): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json"
    },
    signal
  });

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<TResponse>;
}

export function fetchProducts(options: RequestOptions = {}): Promise<Product[]> {
  return request<Product[]>("/products", options);
}

export function fetchProductById(id: number, options: RequestOptions = {}): Promise<Product> {
  return request<Product>(`/products/${id}`, options);
}
