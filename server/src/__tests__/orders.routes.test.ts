import request from "supertest";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { createApp } from "../index";
import { seedDatabase } from "../lib/seed";

const app = createApp();

const payload = {
  customerName: "Lucas Lima",
  customerEmail: "lucas@example.com",
  deliveryMethod: "partner",
  subtotal: 200,
  deliveryFee: 35,
  notes: "Call upon arrival",
  items: [
    { productId: 1, name: "Produto 1", quantity: 2, unitPrice: 80 },
    { productId: 3, name: "Produto 3", quantity: 1, unitPrice: 40 }
  ]
};

describe("orders routes", () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  it("creates and lists orders", async () => {
    const createResponse = await request(app).post("/api/orders").send(payload);
    expect(createResponse.status).toBe(201);
    expect(createResponse.body.pixCode).toMatch(/^PIX-/);

    const listResponse = await request(app).get("/api/orders");
    expect(listResponse.status).toBe(200);
    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body[0].customerEmail).toBe(payload.customerEmail);
  });

  it("validates payloads", async () => {
    const invalid = await request(app).post("/api/orders").send({});
    expect(invalid.status).toBe(400);
  });

  it("updates order status", async () => {
    const createResponse = await request(app).post("/api/orders").send(payload);
    const id = createResponse.body.id;

    const patchResponse = await request(app)
      .patch(`/api/orders/${id}/status`)
      .send({ status: "paid" });
    expect(patchResponse.status).toBe(200);
    expect(patchResponse.body.status).toBe("paid");
  });

  it("exposes summary analytics", async () => {
    await request(app).post("/api/orders").send(payload);
    const summary = await request(app).get("/api/orders/analytics/summary");
    expect(summary.status).toBe(200);
    expect(summary.body).toHaveProperty("totalOrders");
  });
});
