import fs from "fs";
import path from "path";
import { Product } from "../types/product";

const dataPath = path.join(__dirname, "../data/products.json");

let cache: Product[] | null = null;

function loadProducts(): Product[] {
  if (!cache) {
    const fileContents = fs.readFileSync(dataPath, "utf-8");
    cache = JSON.parse(fileContents) as Product[];
  }
  return cache;
}

export function getProducts(): Product[] {
  return loadProducts();
}

export function getProductById(id: number): Product | undefined {
  return loadProducts().find((product) => product.id === id);
}
