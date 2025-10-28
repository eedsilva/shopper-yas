import Database from "better-sqlite3";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { Kysely, SqliteDialect, Generated, ColumnType, Selectable } from "kysely";

type Timestamp = ColumnType<string, string | undefined, string>;

export interface ProductTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image: string | null;
  stock: number;
  sold: number;
  cost: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TagTable {
  id: Generated<number>;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductTagTable {
  productId: number;
  tagId: number;
  assignedAt: Timestamp;
}

export interface DatabaseSchema {
  Product: ProductTable;
  Tag: TagTable;
  ProductTag: ProductTagTable;
}

export function resolveSqlitePath(url: string): string {
  if (url.startsWith("file:")) {
    const filePath = url.replace(/^file:/, "");
    if (filePath === ":memory:") {
      return ":memory:";
    }
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    const dir = path.dirname(absolute);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    return absolute;
  }
  throw new Error(`Unsupported DATABASE_URL protocol in ${url}`);
}

const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
const sqlitePath = resolveSqlitePath(databaseUrl);

const sqlite = new Database(sqlitePath);
sqlite.pragma("foreign_keys = ON");

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({ database: sqlite }),
});

export type ProductRow = Selectable<ProductTable>;
export type TagRow = Selectable<TagTable>;
