import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import {
  listProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getInventorySummary,
  getCategoryBreakdown,
} from "../services/productService";
import { seedDatabase } from "../lib/seed";

const productsPath = path.resolve(__dirname, "../data/products.json");
const rawProducts = JSON.parse(readFileSync(productsPath, "utf-8")) as Array<{
  id: number;
  price: number;
  category: string;
}>;

function expectedSummary() {
  let totalStock = 0;
  let totalSold = 0;
  let inventoryValue = 0;
  let salesRevenue = 0;
  let potentialRevenue = 0;

  for (const product of rawProducts) {
    const stock = 40 + product.id * 5;
    const sold = product.id * 3;
    const cost = Math.round(product.price * 0.55);
    totalStock += stock;
    totalSold += sold;
    inventoryValue += stock * cost;
    salesRevenue += sold * product.price;
    potentialRevenue += stock * product.price;
  }

  return {
    totalProducts: rawProducts.length,
    totalStock,
    totalSold,
    inventoryValue,
    salesRevenue,
    potentialRevenue,
  };
}

describe("productService persistence", () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  it("lists all seeded products with tags", async () => {
    const products = await listProducts();
    expect(products).toHaveLength(rawProducts.length);
    const first = products.find((product) => product.id === 1);
    expect(first).toBeDefined();
    expect(first?.tags.length).toBeGreaterThan(0);
    expect(first?.stock).toBeGreaterThan(0);
  });

  it("creates a new product with tags", async () => {
    const newProduct = await createProduct({
      name: "Test Product",
      description: "A product created during tests",
      price: 120,
      category: "Testing",
      image: null,
      stock: 25,
      sold: 5,
      cost: 70,
      tags: ["test", "beta"],
    });

    expect(newProduct.id).toBeGreaterThan(0);
    expect(newProduct.tags).toContain("test");

    const fetched = await getProductById(newProduct.id);
    expect(fetched?.name).toBe("Test Product");
    expect(fetched?.tags).toContain("beta");
  });

  it("updates product fields and tags", async () => {
    const updated = await updateProduct(1, {
      stock: 99,
      sold: 50,
      tags: ["updated", "core"],
    });

    expect(updated).toBeTruthy();
    expect(updated?.stock).toBe(99);
    expect(updated?.tags).toEqual(["updated", "core"]);
  });

  it("deletes products", async () => {
    const product = await createProduct({
      name: "Disposable",
      description: "To be deleted",
      price: 50,
      category: "Temp",
      image: null,
      stock: 10,
      sold: 0,
      cost: 20,
      tags: [],
    });

    const removed = await deleteProduct(product.id);
    expect(removed).toBe(true);

    const fetched = await getProductById(product.id);
    expect(fetched).toBeNull();
  });

  it("computes aggregate inventory metrics", async () => {
    const summary = await getInventorySummary();
    const expected = expectedSummary();

    expect(summary.totalProducts).toBe(expected.totalProducts);
    expect(summary.totalStock).toBe(expected.totalStock);
    expect(summary.totalSold).toBe(expected.totalSold);
    expect(summary.inventoryValue).toBe(expected.inventoryValue);
    expect(summary.salesRevenue).toBe(expected.salesRevenue);
    expect(summary.potentialRevenue).toBe(expected.potentialRevenue);
  });

  it("returns category level breakdowns", async () => {
    const breakdown = await getCategoryBreakdown();
    const categories = new Set(rawProducts.map((product) => product.category));

    expect(breakdown.length).toBe(categories.size);
    for (const item of breakdown) {
      expect(categories.has(item.category)).toBe(true);
      expect(item.stock).toBeGreaterThan(0);
    }
  });
});
