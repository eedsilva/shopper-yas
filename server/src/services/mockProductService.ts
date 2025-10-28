import seedProducts from "../data/products.json";
import type { Product } from "../types/product";
import type {
  ProductCreateInput,
  ProductListQuery,
  ProductUpdateInput,
} from "../validation/productSchemas";

export interface InventorySummary {
  totalProducts: number;
  totalStock: number;
  totalSold: number;
  inventoryValue: number;
  salesRevenue: number;
  potentialRevenue: number;
}

export interface CategoryBreakdown {
  category: string;
  stock: number;
  sold: number;
  inventoryValue: number;
  salesRevenue: number;
}

interface SeedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  tags?: string[];
}

const sourceProducts = seedProducts as SeedProduct[];

let products: Product[] = sourceProducts.map((item) => {
  const createdAt = new Date().toISOString();
  const tags = Array.from(new Set(item.tags ?? []));
  const stock = 40 + item.id * 5;
  const sold = item.id * 3;
  const cost = Math.round(item.price * 0.55);

  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: item.price,
    category: item.category,
    image: item.image ?? null,
    stock,
    sold,
    cost,
    tags,
    createdAt,
    updatedAt: createdAt,
  };
});

let nextId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;

function cloneProduct(product: Product): Product {
  return {
    ...product,
    tags: [...product.tags],
  };
}

function applyFilters(collection: Product[], filters: ProductListQuery = {}): Product[] {
  const {
    category,
    tag,
    search,
    limit = 50,
    offset = 0,
    sortBy = "name",
    sortDirection = "asc",
  } = filters;

  let result = [...collection];

  if (category) {
    result = result.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    const normalizedTag = tag.toLowerCase();
    result = result.filter((product) =>
      product.tags.some((item) => item.toLowerCase() === normalizedTag)
    );
  }

  if (search) {
    const normalizedSearch = search.toLowerCase();
    result = result.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch)
    );
  }

  const comparators: Record<string, (a: Product, b: Product) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    price: (a, b) => a.price - b.price,
    stock: (a, b) => a.stock - b.stock,
    sold: (a, b) => a.sold - b.sold,
    createdAt: (a, b) => a.createdAt.localeCompare(b.createdAt),
  };

  const comparator = comparators[sortBy] ?? comparators.name;
  const direction = sortDirection === "desc" ? -1 : 1;
  result.sort((a, b) => comparator(a, b) * direction);

  const start = Math.max(offset, 0);
  const end = Math.min(start + limit, result.length);
  return result.slice(start, end).map(cloneProduct);
}

export async function listProducts(filters: ProductListQuery = {}): Promise<Product[]> {
  return applyFilters(products, filters);
}

export async function getProductById(id: number): Promise<Product | null> {
  const product = products.find((item) => item.id === id);
  return product ? cloneProduct(product) : null;
}

function normalizeTags(input: string[] | undefined): string[] {
  if (!input) {
    return [];
  }
  const unique = new Set<string>();
  for (const tag of input) {
    const trimmed = tag.trim();
    if (trimmed) {
      unique.add(trimmed);
    }
  }
  return Array.from(unique);
}

export async function createProduct(payload: ProductCreateInput): Promise<Product> {
  const now = new Date().toISOString();
  const product: Product = {
    id: nextId++,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    category: payload.category,
    image: payload.image ?? null,
    stock: payload.stock,
    sold: payload.sold,
    cost: payload.cost,
    tags: normalizeTags(payload.tags),
    createdAt: now,
    updatedAt: now,
  };

  products = [product, ...products];
  return cloneProduct(product);
}

export async function updateProduct(
  id: number,
  payload: ProductUpdateInput
): Promise<Product | null> {
  const productIndex = products.findIndex((item) => item.id === id);
  if (productIndex === -1) {
    return null;
  }

  const current = products[productIndex];
  const updated: Product = {
    ...current,
    ...payload,
    image: payload.image !== undefined ? payload.image ?? null : current.image,
    tags: payload.tags !== undefined ? normalizeTags(payload.tags) : current.tags,
    updatedAt: new Date().toISOString(),
  };

  products[productIndex] = updated;
  return cloneProduct(updated);
}

export async function deleteProduct(id: number): Promise<boolean> {
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }
  products.splice(index, 1);
  return true;
}

export async function getInventorySummary(): Promise<InventorySummary> {
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

export async function getCategoryBreakdown(): Promise<CategoryBreakdown[]> {
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
