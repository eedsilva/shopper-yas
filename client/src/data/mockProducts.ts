import rawProducts from "./products.json";
import type { Product } from "../types";

interface SeedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  tags?: string[];
}

function enrichProduct(seed: SeedProduct): Product {
  const createdAt = new Date().toISOString();
  const tags = Array.from(new Set(seed.tags ?? []));
  return {
    id: seed.id,
    name: seed.name,
    description: seed.description ?? "",
    price: seed.price,
    category: seed.category,
    image: seed.image ?? null,
    tags,
    stock: 40 + seed.id * 5,
    sold: seed.id * 3,
    cost: Math.round(seed.price * 0.55),
    createdAt,
    updatedAt: createdAt
  };
}

export function createInitialMockProducts(): Product[] {
  return (rawProducts as SeedProduct[]).map(enrichProduct);
}
