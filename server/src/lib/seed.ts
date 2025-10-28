import { readFileSync } from "fs";
import path from "path";
import { db } from "./db";
import { runMigrations } from "./migrate";

interface SeedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
}

export async function seedDatabase() {
  runMigrations();

  const productsPath = path.resolve(__dirname, "../data/products.json");
  const file = readFileSync(productsPath, "utf-8");
  const products: SeedProduct[] = JSON.parse(file);

  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("ProductTag").execute();
    await trx.deleteFrom("Tag").execute();
    await trx.deleteFrom("Product").execute();

    for (const product of products) {
      const stock = 40 + product.id * 5;
      const sold = product.id * 3;
      const cost = Math.round(product.price * 0.55);

      await trx
        .insertInto("Product")
        .values({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          stock,
          sold,
          cost,
        })
        .execute();

      for (const tagName of product.tags) {
        const tagInsert = await trx
          .insertInto("Tag")
          .values({ name: tagName })
          .onConflict((oc) => oc.column("name").doNothing())
          .returning("id")
          .executeTakeFirst();

        const tagId =
          tagInsert?.id ??
          (await trx
            .selectFrom("Tag")
            .select("id")
            .where("name", "=", tagName)
            .executeTakeFirstOrThrow()).id;

        await trx
          .insertInto("ProductTag")
          .values({ productId: product.id, tagId })
          .onConflict((oc) => oc.columns(["productId", "tagId"]).doNothing())
          .execute();
      }
    }
  });
}
