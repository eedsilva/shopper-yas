import type { Order, OrderSummary } from "../types";
import { API_BASE_URL, USE_MOCK_DATA } from "../config";
import * as mockApi from "./mock/orders";

export interface OrderCreatePayload {
  customerName: string;
  customerEmail: string;
  deliveryMethod: Order["deliveryMethod"];
  items: Order["items"];
  subtotal: number;
  deliveryFee: number;
  notes?: string;
}

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

export function createOrder(payload: OrderCreatePayload): Promise<Order> {
  if (USE_MOCK_DATA) {
    return mockApi.createOrder(payload);
  }
  return request<Order>("/orders", { method: "POST", body: payload });
}

export function fetchOrders(options: RequestOptions = {}): Promise<Order[]> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchOrders();
  }
  return request<Order[]>("/orders", options);
}

export function fetchOrderSummary(options: RequestOptions = {}): Promise<OrderSummary> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchOrderSummary();
  }
  return request<OrderSummary>("/orders/analytics/summary", options);
}

export function confirmOrder(id: number): Promise<Order> {
  if (USE_MOCK_DATA) {
    return mockApi.confirmOrder(id);
  }
  return request<Order>(`/orders/${id}/status`, {
    method: "PATCH",
    body: { status: "paid" }
  });
}
