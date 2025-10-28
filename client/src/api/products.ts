import type {
  CategoryBreakdown,
  InventorySummary,
  Product,
  ProductDraft,
  ProductUpdatePayload,
} from "../types";
import { API_BASE_URL, USE_MOCK_DATA } from "../config";
import * as mockApi from "./mock/products";

interface RequestOptions {
  method?: string;
  body?: unknown;
  signal?: AbortSignal;
}

async function request<TResponse>(
  path: string,
  { method = "GET", body, signal }: RequestOptions = {}
): Promise<TResponse> {
  if (USE_MOCK_DATA) {
    throw new Error("request helper should not be used when mock data is enabled");
  }

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
  if (USE_MOCK_DATA) {
    return mockApi.fetchProducts();
  }
  return request<Product[]>("/products", options).then((products) =>
    products.map((product) => ({
      ...product,
      image: product.image ?? null,
      tags: product.tags ?? []
    }))
  );
}

export function fetchProductById(id: number, options: RequestOptions = {}): Promise<Product> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchProductById(id);
  }
  return request<Product>(`/products/${id}`, options);
}

export function fetchInventorySummary(options: RequestOptions = {}): Promise<InventorySummary> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchInventorySummary();
  }
  return request<InventorySummary>("/products/analytics/summary", options);
}

export function fetchCategoryBreakdown(options: RequestOptions = {}): Promise<CategoryBreakdown[]> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchCategoryBreakdown();
  }
  return request<CategoryBreakdown[]>("/products/analytics/categories", options);
}

export function createProduct(payload: ProductDraft): Promise<Product> {
  if (USE_MOCK_DATA) {
    return mockApi.createProduct(payload);
  }
  return request<Product>("/products", { method: "POST", body: payload });
}

export function updateProduct(id: number, payload: ProductUpdatePayload): Promise<Product> {
  if (USE_MOCK_DATA) {
    return mockApi.updateProduct(id, payload);
  }
  return request<Product>(`/products/${id}`, { method: "PATCH", body: payload });
}

export function deleteProduct(id: number): Promise<void> {
  if (USE_MOCK_DATA) {
    return mockApi.deleteProduct(id);
  }
  return request<void>(`/products/${id}`, { method: "DELETE" });
}
