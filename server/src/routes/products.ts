import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dataPath = path.join(__dirname, "../data/products.json");

router.get("/", (_, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  res.json(data);
});

router.get("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const product = data.find((p: any) => p.id === Number(req.params.id));
  product ? res.json(product) : res.status(404).json({ message: "Not found" });
});

export default router;
