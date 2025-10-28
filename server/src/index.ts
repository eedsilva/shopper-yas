import "./config/loadEnv";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";

import productRoutes from "./routes/products";
import adminRoutes from "./routes/admin";
import orderRoutes from "./routes/orders";
import { logger } from "./lib/logger";
import { errorHandler } from "./middleware/errorHandler";
import { checkDatabaseHealth } from "./services/health";

export function createApp(configureApp?: (app: Express) => void) {
  const app = express();
  app.use(
    pinoHttp({
      logger,
      genReqId(req) {
        const headerId = req.headers["x-request-id"];
        if (typeof headerId === "string" && headerId.trim().length > 0) {
          return headerId;
        }
        if (Array.isArray(headerId) && headerId.length > 0) {
          const first = headerId.find((value) => value && value.trim().length > 0);
          if (first) {
            return first;
          }
        }
        return randomUUID();
      },
      customLogLevel(_req, res, err) {
        if (res.statusCode >= 500 || err) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
      },
    })
  );
  app.use(cors());
  app.use(express.json());

  app.get("/", (_, res) => res.send("Shopper YAS API is running 🚀"));
  app.get("/api/health", async (_req, res) => {
    const database = await checkDatabaseHealth();
    const statusCode = database.status === "ok" ? 200 : 503;

    return res.status(statusCode).json({
      api: { status: "ok" },
      database,
    });
  });
  app.use("/api/products", productRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/orders", orderRoutes);

  if (configureApp) {
    configureApp(app);
  }

  app.use(errorHandler);

  return app;
}

if (process.env.NODE_ENV !== "test") {
  const app = createApp();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
