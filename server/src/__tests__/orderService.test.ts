import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import {
  createOrder,
  getOrderById,
  getOrderSummary,
  listOrders,
  updateOrderStatus
} from "../services/orderService";
import { seedDatabase } from "../lib/seed";

const sampleOrder = {
  customerName: "Maria Silva",
  customerEmail: "maria@example.com",
  deliveryMethod: "correios" as const,
  subtotal: 300,
  deliveryFee: 20,
  notes: "Leave with the concierge",
  items: [
    { productId: 1, name: "Produto 1", quantity: 1, unitPrice: 150 },
    { productId: 2, name: "Produto 2", quantity: 3, unitPrice: 50 }
  ]
};

describe("orderService persistence", () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  it("creates and retrieves orders", async () => {
    const created = await createOrder(sampleOrder);
    expect(created.id).toBeGreaterThan(0);
    expect(created.items).toHaveLength(sampleOrder.items.length);
    expect(created.status).toBe("pending");

    const fetched = await getOrderById(created.id);
    expect(fetched?.customerEmail).toBe(sampleOrder.customerEmail);
    expect(fetched?.items[0]?.name).toBe(sampleOrder.items[0]?.name);
  });

  it("lists orders sorted by newest", async () => {
    const first = await createOrder(sampleOrder);
    const second = await createOrder({
      ...sampleOrder,
      customerEmail: "outra@example.com",
      notes: "",
      deliveryMethod: "pickup",
      items: sampleOrder.items.slice(0, 1)
    });

    const orders = await listOrders();
    expect(orders).toHaveLength(2);
    expect(orders[0].id).toBe(second.id);
    expect(orders[1].id).toBe(first.id);
  });

  it("updates order status", async () => {
    const order = await createOrder(sampleOrder);
    const updated = await updateOrderStatus(order.id, { status: "paid" });
    expect(updated?.status).toBe("paid");
  });

  it("aggregates order metrics", async () => {
    await createOrder(sampleOrder);
    const order = await createOrder({
      ...sampleOrder,
      customerEmail: "paid@example.com"
    });
    await updateOrderStatus(order.id, { status: "paid" });

    const summary = await getOrderSummary();
    expect(summary.totalOrders).toBe(2);
    expect(summary.paidOrders).toBe(1);
    expect(summary.pendingOrders).toBe(1);
    expect(summary.totalRevenue).toBeGreaterThan(0);
    expect(summary.averageOrderValue).toBeGreaterThan(0);
  });
});
