import { z } from "zod";

const tagArray = z.array(z.string().trim().min(1)).default([]);

export const productCreateSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  price: z.number().int().nonnegative(),
  category: z.string().trim().min(1),
  image: z.string().url().optional().nullable(),
  stock: z.number().int().nonnegative(),
  sold: z.number().int().nonnegative(),
  cost: z.number().int().nonnegative(),
  tags: tagArray,
});

export const productUpdateSchema = productCreateSchema
  .partial()
  .extend({
    tags: tagArray.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const productListQuerySchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  limit: z
    .coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),
  offset: z
    .coerce
    .number()
    .int()
    .min(0)
    .optional(),
  sortBy: z.enum(["name", "price", "stock", "sold", "createdAt"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
