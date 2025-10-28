import { Router } from "express";

import {
  createOrder,
  getOrderById,
  getOrderSummary,
  listOrders,
  updateOrderStatus
} from "../services/orderService";
import { orderCreateSchema, orderStatusSchema } from "../validation/orderSchemas";

const router = Router();

router.get("/", async (_req, res) => {
  const orders = await listOrders();
  res.json(orders);
});

router.get("/analytics/summary", async (_req, res) => {
  const summary = await getOrderSummary();
  res.json(summary);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Invalid order id" });
  }
  const order = await getOrderById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.json(order);
});

router.post("/", async (req, res) => {
  const parsed = orderCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.issues });
  }
  const order = await createOrder(parsed.data);
  res.status(201).json(order);
});

router.patch("/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Invalid order id" });
  }
  const parsed = orderStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.issues });
  }
  const updated = await updateOrderStatus(id, parsed.data);
  if (!updated) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.json(updated);
});

export default router;
