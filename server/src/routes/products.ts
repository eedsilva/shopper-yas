import { Router } from "express";
import { getProductById, getProducts } from "../services/productService";

const router = Router();

router.get("/", (_, res) => {
  res.json(getProducts());
});

router.get("/:id", (req, res) => {
  const product = getProductById(Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.json(product);
});

export default router;
