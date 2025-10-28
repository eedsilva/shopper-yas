import { config } from "dotenv";
import { existsSync } from "fs";
import path from "path";

const candidateEnvFiles = [
  path.resolve(process.cwd(), "..", ".env"),
  path.resolve(process.cwd(), ".env")
];

for (const filePath of candidateEnvFiles) {
  if (existsSync(filePath)) {
    config({ path: filePath, override: false });
  }
}
