import { featureFlags } from "../config/featureFlags";
import * as dbService from "./dbOrderService";
import * as mockService from "./mockOrderService";

const service: typeof dbService = featureFlags.useMockData ? mockService : dbService;

export const {
  listOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getOrderSummary
} = service;
