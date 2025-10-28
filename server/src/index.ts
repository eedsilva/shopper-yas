import "./config/loadEnv";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/products";
import adminRoutes from "./routes/admin";
import orderRoutes from "./routes/orders";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (_, res) => res.send("Shopper YAS API is running 🚀"));
  app.use("/api/products", productRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/orders", orderRoutes);

  return app;
}

if (process.env.NODE_ENV !== "test") {
  const app = createApp();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
