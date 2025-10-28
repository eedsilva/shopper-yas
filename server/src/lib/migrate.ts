import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import Database from "better-sqlite3";
import { resolveSqlitePath } from "./db";

export function runMigrations(databaseUrl = process.env.DATABASE_URL || "file:./dev.db") {
  const migrationsDir = path.resolve(__dirname, "../../prisma/migrations");
  const migrationFolders = readdirSync(migrationsDir).filter((folder) => {
    if (folder.startsWith(".")) {
      return false;
    }
    const fullPath = path.join(migrationsDir, folder);
    return statSync(fullPath).isDirectory();
  });

  const migrations = migrationFolders
    .map((folder) => ({
      folder,
      sqlPath: path.join(migrationsDir, folder, "migration.sql"),
    }))
    .filter(({ sqlPath }) => sqlPath.endsWith(".sql"))
    .sort((a, b) => a.folder.localeCompare(b.folder));

  const sqlitePath = resolveSqlitePath(databaseUrl);
  const db = new Database(sqlitePath);

  db.pragma("foreign_keys = ON");

  db.exec(
    "CREATE TABLE IF NOT EXISTS _prisma_migrations(id TEXT PRIMARY KEY, checksum TEXT NOT NULL, finished_at DATETIME, migration_name TEXT NOT NULL, logs TEXT, rolled_back_at DATETIME, started_at DATETIME DEFAULT CURRENT_TIMESTAMP, applied_steps_count INTEGER DEFAULT 0);"
  );

  for (const { folder, sqlPath } of migrations) {
    const sql = readFileSync(sqlPath, "utf-8");
    const alreadyApplied = db
      .prepare("SELECT 1 FROM _prisma_migrations WHERE migration_name = ?")
      .get(folder);
    if (alreadyApplied) {
      continue;
    }
    const migration = db.transaction(() => {
      try {
        db.exec(sql);
      } catch (error) {
        if (
          error instanceof Error &&
          /already exists/i.test(error.message)
        ) {
          // The migration has effectively been applied previously; continue.
        } else {
          throw error;
        }
      }
      db
        .prepare(
          "INSERT INTO _prisma_migrations (id, checksum, migration_name, applied_steps_count, finished_at) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)"
        )
        .run(folder, "manual", folder);
    });
    migration();
    console.log(`Applied migration ${folder}`);
  }

  db.close();
}
