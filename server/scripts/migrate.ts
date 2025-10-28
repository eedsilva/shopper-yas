import dotenv from "dotenv";
import { runMigrations } from "../src/lib/migrate";

dotenv.config();

runMigrations();
