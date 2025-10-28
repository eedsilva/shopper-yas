import dotenv from "dotenv";
import { db } from "../src/lib/db";
import { seedDatabase } from "../src/lib/seed";

dotenv.config();

seedDatabase()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.destroy();
  });
