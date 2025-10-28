import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  name: z.string().trim().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative()
});

export const orderCreateSchema = z.object({
  customerName: z.string().trim().min(1),
  customerEmail: z.string().trim().email(),
  deliveryMethod: z.enum(["correios", "partner", "pickup"]),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  notes: z.string().trim().max(500).default("")
});

export const orderStatusSchema = z.object({
  status: z.enum(["pending", "paid"])
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
export type OrderStatusInput = z.infer<typeof orderStatusSchema>;
