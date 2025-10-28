import { createInitialMockProducts } from "../../data/mockProducts";
import type {
  CategoryBreakdown,
  InventorySummary,
  Product,
  ProductDraft,
  ProductUpdatePayload,
} from "../../types";

let products: Product[] = createInitialMockProducts();
let nextId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;

function cloneProduct(product: Product): Product {
  return {
    ...product,
    tags: [...product.tags],
  };
}

function normalizeTags(tags: string[] | undefined): string[] {
  if (!tags) {
    return [];
  }
  const unique = new Set<string>();
  for (const tag of tags) {
    const trimmed = tag.trim();
    if (trimmed) {
      unique.add(trimmed);
    }
  }
  return Array.from(unique);
}

export async function fetchProducts(): Promise<Product[]> {
  return products.map(cloneProduct);
}

export async function fetchProductById(id: number): Promise<Product> {
  const product = products.find((item) => item.id === id);
  if (!product) {
    throw new Error("Product not found");
  }
  return cloneProduct(product);
}

export async function fetchInventorySummary(): Promise<InventorySummary> {
  return products.reduce<InventorySummary>(
    (accumulator, product) => {
      accumulator.totalProducts += 1;
      accumulator.totalStock += product.stock;
      accumulator.totalSold += product.sold;
      accumulator.inventoryValue += product.stock * product.cost;
      accumulator.salesRevenue += product.sold * product.price;
      accumulator.potentialRevenue += product.stock * product.price;
      return accumulator;
    },
    {
      totalProducts: 0,
      totalStock: 0,
      totalSold: 0,
      inventoryValue: 0,
      salesRevenue: 0,
      potentialRevenue: 0,
    }
  );
}

export async function fetchCategoryBreakdown(): Promise<CategoryBreakdown[]> {
  const byCategory = new Map<string, CategoryBreakdown>();

  for (const product of products) {
    const current = byCategory.get(product.category) ?? {
      category: product.category,
      stock: 0,
      sold: 0,
      inventoryValue: 0,
      salesRevenue: 0,
    };

    current.stock += product.stock;
    current.sold += product.sold;
    current.inventoryValue += product.stock * product.cost;
    current.salesRevenue += product.sold * product.price;
    byCategory.set(product.category, current);
  }

  return Array.from(byCategory.values()).sort((a, b) => a.category.localeCompare(b.category));
}

export async function createProduct(payload: ProductDraft): Promise<Product> {
  const now = new Date().toISOString();
  const product: Product = {
    id: nextId++,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    category: payload.category,
    image: payload.image ?? null,
    tags: normalizeTags(payload.tags),
    stock: payload.stock,
    sold: payload.sold,
    cost: payload.cost,
    createdAt: now,
    updatedAt: now,
  };

  products = [product, ...products];
  return cloneProduct(product);
}

export async function updateProduct(id: number, payload: ProductUpdatePayload): Promise<Product> {
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }

  const current = products[index];
  const updated: Product = {
    ...current,
    ...payload,
    image: payload.image !== undefined ? payload.image ?? null : current.image,
    tags: payload.tags !== undefined ? normalizeTags(payload.tags) : current.tags,
    updatedAt: new Date().toISOString(),
  };

  products[index] = updated;
  return cloneProduct(updated);
}

export async function deleteProduct(id: number): Promise<void> {
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  products.splice(index, 1);
}
