import type { Order, OrderSummary } from "../types/order";
import type { OrderCreateInput, OrderStatusInput } from "../validation/orderSchemas";

let orders: Order[] = [];
let nextId = 1;

function clone(order: Order): Order {
  return {
    ...order,
    items: order.items.map((item) => ({ ...item }))
  };
}

function generatePixCode(id: number): string {
  return `PIX-${id.toString().padStart(6, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function listOrders(): Promise<Order[]> {
  return orders.map(clone);
}

export async function getOrderById(id: number): Promise<Order | null> {
  const order = orders.find((item) => item.id === id);
  return order ? clone(order) : null;
}

export async function createOrder(payload: OrderCreateInput): Promise<Order> {
  const id = nextId++;
  const now = new Date().toISOString();
  const order: Order = {
    id,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    deliveryMethod: payload.deliveryMethod,
    items: payload.items.map((item) => ({ ...item })),
    subtotal: payload.subtotal,
    deliveryFee: payload.deliveryFee,
    total: payload.subtotal + payload.deliveryFee,
    status: "pending",
    pixCode: generatePixCode(id),
    notes: payload.notes ?? "",
    createdAt: now,
    updatedAt: now
  };

  orders = [order, ...orders];
  return clone(order);
}

export async function updateOrderStatus(id: number, payload: OrderStatusInput): Promise<Order | null> {
  const index = orders.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const current = orders[index];
  const updated: Order = {
    ...current,
    status: payload.status,
    updatedAt: new Date().toISOString()
  };

  orders[index] = updated;
  return clone(updated);
}

export async function getOrderSummary(): Promise<OrderSummary> {
  if (orders.length === 0) {
    return {
      totalOrders: 0,
      pendingOrders: 0,
      paidOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0
    };
  }

  const aggregate = orders.reduce(
    (accumulator, order) => {
      accumulator.totalOrders += 1;
      accumulator.totalRevenue += order.total;
      if (order.status === "paid") {
        accumulator.paidOrders += 1;
      } else {
        accumulator.pendingOrders += 1;
      }
      return accumulator;
    },
    { totalOrders: 0, pendingOrders: 0, paidOrders: 0, totalRevenue: 0 }
  );

  return {
    ...aggregate,
    averageOrderValue:
      aggregate.totalOrders > 0 ? aggregate.totalRevenue / aggregate.totalOrders : 0
  };
}

export function resetOrders() {
  orders = [];
  nextId = 1;
}
