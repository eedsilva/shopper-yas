import type {
  CategoryBreakdown,
  InventorySummary,
  Product,
  ProductDraft,
  ProductUpdatePayload,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

interface RequestOptions {
  method?: string;
  body?: unknown;
  signal?: AbortSignal;
}

async function request<TResponse>(
  path: string,
  { method = "GET", body, signal }: RequestOptions = {}
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {})
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal
  });

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

export function fetchProducts(options: RequestOptions = {}): Promise<Product[]> {
  return request<Product[]>("/products", options).then((products) =>
    products.map((product) => ({
      ...product,
      image: product.image ?? null,
      tags: product.tags ?? []
    }))
  );
}

export function fetchProductById(id: number, options: RequestOptions = {}): Promise<Product> {
  return request<Product>(`/products/${id}`, options);
}

export function fetchInventorySummary(options: RequestOptions = {}): Promise<InventorySummary> {
  return request<InventorySummary>("/products/analytics/summary", options);
}

export function fetchCategoryBreakdown(options: RequestOptions = {}): Promise<CategoryBreakdown[]> {
  return request<CategoryBreakdown[]>("/products/analytics/categories", options);
}

export function createProduct(payload: ProductDraft): Promise<Product> {
  return request<Product>("/products", { method: "POST", body: payload });
}

export function updateProduct(id: number, payload: ProductUpdatePayload): Promise<Product> {
  return request<Product>(`/products/${id}`, { method: "PATCH", body: payload });
}

export function deleteProduct(id: number): Promise<void> {
  return request<void>(`/products/${id}`, { method: "DELETE" });
}
