import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getCategoryBreakdown,
  getInventorySummary,
  getProductById,
  listProducts,
  updateProduct,
} from "../services/productService";
import requireAdmin from "../middleware/requireAdmin";
import {
  productCreateSchema,
  productListQuerySchema,
  productUpdateSchema,
} from "../validation/productSchemas";

const router = Router();

router.get("/analytics/summary", async (req, res) => {
  try {
    const summary = await getInventorySummary();
    res.json(summary);
  } catch (error) {
    console.error("Failed to fetch inventory summary", error);
    res.status(500).json({ message: "Failed to fetch inventory summary" });
  }
});

router.get("/analytics/categories", async (req, res) => {
  try {
    const breakdown = await getCategoryBreakdown();
    res.json(breakdown);
  } catch (error) {
    console.error("Failed to fetch category breakdown", error);
    res.status(500).json({ message: "Failed to fetch category breakdown" });
  }
});

router.get("/", async (req, res) => {
  const parseResult = productListQuerySchema.safeParse(req.query);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid query parameters",
      errors: parseResult.error.flatten(),
    });
  }

  try {
    const products = await listProducts(parseResult.data);
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Failed to fetch product", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  const parseResult = productCreateSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid payload",
      errors: parseResult.error.flatten(),
    });
  }

  try {
    const product = await createProduct(parseResult.data);
    res.status(201).json(product);
  } catch (error) {
    console.error("Failed to create product", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

router.patch("/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const parseResult = productUpdateSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid payload",
      errors: parseResult.error.flatten(),
    });
  }

  try {
    const product = await updateProduct(id, parseResult.data);
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Failed to update product", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const deleted = await deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete product", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
