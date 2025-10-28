import request from "supertest";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../index";
import { seedDatabase } from "../lib/seed";
const app = createApp();

describe("products routes", () => {
  let authToken: string;

  beforeAll(async () => {
    await seedDatabase();
    const loginResponse = await request(app).post("/api/admin/login").send({ code: "admin" });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeTruthy();
    authToken = loginResponse.body.token;
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  it("returns product listings", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("rejects unauthorized modifications", async () => {
    const payload = {
      name: "Unauthorized Product",
      description: "Should not be created",
      price: 100,
      category: "Test",
      image: "https://example.com/test.png",
      stock: 1,
      sold: 0,
      cost: 50,
      tags: ["unauthorized"],
    };

    const createResponse = await request(app).post("/api/products").send(payload);
    expect(createResponse.status).toBe(401);

    const updateResponse = await request(app)
      .patch("/api/products/1")
      .send({ price: 150 });
    expect(updateResponse.status).toBe(401);

    const deleteResponse = await request(app).delete("/api/products/1");
    expect(deleteResponse.status).toBe(401);
  });

  it("creates products with validation", async () => {
    const invalid = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "bad" });
    expect(invalid.status).toBe(400);

    const payload = {
      name: "Route Product",
      description: "Created via route",
      price: 180,
      category: "Routes",
      image: "https://example.com/product.png",
      stock: 12,
      sold: 2,
      cost: 90,
      tags: ["route", "api"],
    };

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send(payload);
    expect(response.status).toBe(201);
    expect(response.body.tags).toContain("route");
  });

  it("updates and deletes products", async () => {
    const createResponse = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Update Target",
        description: "Needs updates",
        price: 200,
        category: "Routes",
        image: "https://example.com/update.png",
        stock: 8,
        sold: 1,
        cost: 110,
        tags: ["initial"],
      });

    const id = createResponse.body.id;
    const patch = await request(app)
      .patch(`/api/products/${id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ stock: 30, tags: ["updated"] });
    expect(patch.status).toBe(200);
    expect(patch.body.stock).toBe(30);
    expect(patch.body.tags).toEqual(["updated"]);

    const remove = await request(app)
      .delete(`/api/products/${id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(remove.status).toBe(204);

    const missing = await request(app).get(`/api/products/${id}`);
    expect(missing.status).toBe(404);
  });

  it("provides analytics endpoints", async () => {
    const summary = await request(app).get("/api/products/analytics/summary");
    expect(summary.status).toBe(200);
    expect(summary.body.totalProducts).toBeGreaterThan(0);

    const categories = await request(app).get("/api/products/analytics/categories");
    expect(categories.status).toBe(200);
    expect(Array.isArray(categories.body)).toBe(true);
    expect(categories.body[0]).toHaveProperty("category");
  });
});
