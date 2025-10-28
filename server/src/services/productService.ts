import { Kysely, sql } from "kysely";
import { db, DatabaseSchema, ProductRow } from "../lib/db";
import { Product } from "../types/product";
import {
  ProductCreateInput,
  ProductListQuery,
  ProductUpdateInput,
} from "../validation/productSchemas";

type ProductQueryResult = ProductRow & { tagList: string | null };

function normalizeChangeCount(value: bigint | number | undefined | null): number {
  if (typeof value === "bigint") {
    return Number(value);
  }
  if (typeof value === "number") {
    return value;
  }
  return 0;
}

function toProduct(row: ProductQueryResult): Product {
  const tags = row.tagList ? row.tagList.split(",").filter(Boolean) : [];
  const uniqueTags = Array.from(new Set(tags));
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    price: row.price,
    category: row.category,
    image: row.image ?? null,
    stock: row.stock,
    sold: row.sold,
    cost: row.cost,
    tags: uniqueTags,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function buildProductQuery(instance: Kysely<DatabaseSchema>) {
  return instance
    .selectFrom("Product as p")
    .leftJoin("ProductTag as pt", "pt.productId", "p.id")
    .leftJoin("Tag as t", "t.id", "pt.tagId")
    .select([
      "p.id",
      "p.name",
      "p.description",
      "p.price",
      "p.category",
      "p.image",
      "p.stock",
      "p.sold",
      "p.cost",
      "p.createdAt",
      "p.updatedAt",
      sql<string>`COALESCE(GROUP_CONCAT(DISTINCT t.name), '')`.as("tagList"),
    ])
    .groupBy([
      "p.id",
      "p.name",
      "p.description",
      "p.price",
      "p.category",
      "p.image",
      "p.stock",
      "p.sold",
      "p.cost",
      "p.createdAt",
      "p.updatedAt",
    ]);
}

export async function listProducts(filters: ProductListQuery = {}): Promise<Product[]> {
  const {
    category,
    tag,
    search,
    limit = 50,
    offset = 0,
    sortBy = "name",
    sortDirection = "asc",
  } = filters;

  let query = buildProductQuery(db);

  if (category) {
    query = query.where("p.category", "=", category);
  }

  if (tag) {
    query = query.where("t.name", "=", tag);
  }

  if (search) {
    const likeValue = `%${search}%`;
    query = query.where((eb) =>
      eb.or([
        eb("p.name", "like", likeValue),
        eb("p.description", "like", likeValue),
        eb("p.category", "like", likeValue),
      ])
    );
  }

  const sortColumnMap: Record<string, string> = {
    name: "p.name",
    price: "p.price",
    stock: "p.stock",
    sold: "p.sold",
    createdAt: "p.createdAt",
  };
  const orderColumn = sortColumnMap[sortBy] ?? "p.name";
  const direction = sortDirection === "desc" ? "desc" : "asc";

  const rows = await query
    .orderBy(orderColumn as any, direction)
    .limit(limit)
    .offset(offset)
    .execute();

  return rows.map(toProduct);
}

export async function getProductById(id: number): Promise<Product | null> {
  const row = await buildProductQuery(db)
    .where("p.id", "=", id)
    .executeTakeFirst();
  return row ? toProduct(row) : null;
}

export async function createProduct(payload: ProductCreateInput): Promise<Product> {
  const tags = payload.tags ?? [];
  const now = new Date().toISOString();

  return db.transaction().execute(async (trx) => {
    const inserted = await trx
      .insertInto("Product")
      .values({
        name: payload.name,
        description: payload.description,
        price: payload.price,
        category: payload.category,
        image: payload.image ?? null,
        stock: payload.stock,
        sold: payload.sold,
        cost: payload.cost,
        createdAt: now,
        updatedAt: now,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    if (tags.length > 0) {
      await upsertTags(trx, inserted.id, tags);
    }

    const row = await buildProductQuery(trx)
      .where("p.id", "=", inserted.id)
      .executeTakeFirstOrThrow();

    return toProduct(row);
  });
}

export async function updateProduct(
  id: number,
  payload: ProductUpdateInput
): Promise<Product | null> {
  return db.transaction().execute(async (trx) => {
    const updateData: Partial<ProductRow> & { updatedAt?: string } = {};
    const now = new Date().toISOString();

    if (payload.name !== undefined) updateData.name = payload.name;
    if (payload.description !== undefined) updateData.description = payload.description;
    if (payload.price !== undefined) updateData.price = payload.price;
    if (payload.category !== undefined) updateData.category = payload.category;
    if (payload.image !== undefined) updateData.image = payload.image ?? null;
    if (payload.stock !== undefined) updateData.stock = payload.stock;
    if (payload.sold !== undefined) updateData.sold = payload.sold;
    if (payload.cost !== undefined) updateData.cost = payload.cost;

    if (Object.keys(updateData).length > 0) {
      updateData.updatedAt = now;
      const result = await trx
        .updateTable("Product")
        .set(updateData)
        .where("id", "=", id)
        .executeTakeFirst();

      if (normalizeChangeCount(result?.numUpdatedRows) === 0) {
        return null;
      }
    } else {
      const exists = await trx
        .selectFrom("Product")
        .select("id")
        .where("id", "=", id)
        .executeTakeFirst();
      if (!exists) {
        return null;
      }
    }

    if (payload.tags !== undefined) {
      await trx.deleteFrom("ProductTag").where("productId", "=", id).execute();
      if (payload.tags.length > 0) {
        await upsertTags(trx, id, payload.tags);
      }
    }

    const row = await buildProductQuery(trx)
      .where("p.id", "=", id)
      .executeTakeFirst();

    return row ? toProduct(row) : null;
  });
}

export async function deleteProduct(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom("Product")
    .where("id", "=", id)
    .executeTakeFirst();
  return normalizeChangeCount(result?.numDeletedRows) > 0;
}

async function upsertTags(trx: Kysely<DatabaseSchema>, productId: number, tags: string[]) {
  for (const tagName of tags) {
    const trimmed = tagName.trim();
    if (!trimmed) continue;
    const insertedTag = await trx
      .insertInto("Tag")
      .values({ name: trimmed })
      .onConflict((oc) => oc.column("name").doNothing())
      .returning(["id"])
      .executeTakeFirst();

    const tagId =
      insertedTag?.id ??
      (await trx
        .selectFrom("Tag")
        .select("id")
        .where("name", "=", trimmed)
        .executeTakeFirstOrThrow()).id;

    await trx
      .insertInto("ProductTag")
      .values({ productId, tagId })
      .onConflict((oc) => oc.columns(["productId", "tagId"]).doNothing())
      .execute();
  }
}

export interface InventorySummary {
  totalProducts: number;
  totalStock: number;
  totalSold: number;
  inventoryValue: number;
  salesRevenue: number;
  potentialRevenue: number;
}

export async function getInventorySummary(): Promise<InventorySummary> {
  const summary = await db
    .selectFrom("Product")
    .select([
      sql<number>`COALESCE(COUNT(*), 0)`.as("totalProducts"),
      sql<number>`COALESCE(SUM(stock), 0)`.as("totalStock"),
      sql<number>`COALESCE(SUM(sold), 0)`.as("totalSold"),
      sql<number>`COALESCE(SUM(stock * cost), 0)`.as("inventoryValue"),
      sql<number>`COALESCE(SUM(sold * price), 0)`.as("salesRevenue"),
      sql<number>`COALESCE(SUM(stock * price), 0)`.as("potentialRevenue"),
    ])
    .executeTakeFirst();

  return {
    totalProducts: summary?.totalProducts ?? 0,
    totalStock: summary?.totalStock ?? 0,
    totalSold: summary?.totalSold ?? 0,
    inventoryValue: summary?.inventoryValue ?? 0,
    salesRevenue: summary?.salesRevenue ?? 0,
    potentialRevenue: summary?.potentialRevenue ?? 0,
  };
}

export interface CategoryBreakdown {
  category: string;
  stock: number;
  sold: number;
  inventoryValue: number;
  salesRevenue: number;
}

export async function getCategoryBreakdown(): Promise<CategoryBreakdown[]> {
  const rows = await db
    .selectFrom("Product")
    .select([
      "category",
      sql<number>`COALESCE(SUM(stock), 0)`.as("stock"),
      sql<number>`COALESCE(SUM(sold), 0)`.as("sold"),
      sql<number>`COALESCE(SUM(stock * cost), 0)`.as("inventoryValue"),
      sql<number>`COALESCE(SUM(sold * price), 0)`.as("salesRevenue"),
    ])
    .groupBy("category")
    .orderBy("category")
    .execute();

  return rows.map((row) => ({
    category: row.category,
    stock: row.stock ?? 0,
    sold: row.sold ?? 0,
    inventoryValue: row.inventoryValue ?? 0,
    salesRevenue: row.salesRevenue ?? 0,
  }));
}
