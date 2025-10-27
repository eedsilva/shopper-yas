import express from "express";
import cors from "cors";
import productRoutes from "./routes/products";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Shopper YAS API is running 🚀"));
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
