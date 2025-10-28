import { featureFlags } from "../config/featureFlags";
import * as dbService from "./dbProductService";
import * as mockService from "./mockProductService";

const service: typeof dbService = featureFlags.useMockData ? mockService : dbService;

export const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getInventorySummary,
  getCategoryBreakdown,
} = service;

export type { InventorySummary, CategoryBreakdown } from "./dbProductService";
