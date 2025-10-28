import { Kysely } from "kysely";

import { db, DatabaseSchema, OrderItemRow, OrderRow } from "../lib/db";
import type { Order, OrderSummary } from "../types/order";
import type { OrderCreateInput, OrderStatusInput } from "../validation/orderSchemas";

function toOrder(row: OrderRow, items: OrderItemRow[]): Order {
  return {
    id: row.id,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    deliveryMethod: row.deliveryMethod as Order["deliveryMethod"],
    items: items.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice
    })),
    subtotal: row.subtotal,
    deliveryFee: row.deliveryFee,
    total: row.total,
    status: row.status as Order["status"],
    pixCode: row.pixCode,
    notes: row.notes ?? "",
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

async function loadItems(
  instance: Kysely<DatabaseSchema>,
  orderIds: number[]
): Promise<Map<number, OrderItemRow[]>> {
  if (orderIds.length === 0) {
    return new Map();
  }

  const rows = await instance
    .selectFrom("OrderItem")
    .selectAll()
    .where("orderId", "in", orderIds)
    .orderBy("createdAt", "asc")
    .execute();

  const grouped = new Map<number, OrderItemRow[]>();
  for (const item of rows) {
    const current = grouped.get(item.orderId) ?? [];
    current.push(item);
    grouped.set(item.orderId, current);
  }
  return grouped;
}

export async function listOrders(): Promise<Order[]> {
  const rows = await db
    .selectFrom("Order")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();

  const itemMap = await loadItems(db, rows.map((row) => row.id));
  return rows.map((row) => toOrder(row, itemMap.get(row.id) ?? []));
}

export async function getOrderById(id: number): Promise<Order | null> {
  const row = await db.selectFrom("Order").selectAll().where("id", "=", id).executeTakeFirst();
  if (!row) {
    return null;
  }
  const items = await loadItems(db, [row.id]);
  return toOrder(row, items.get(row.id) ?? []);
}

export async function createOrder(payload: OrderCreateInput): Promise<Order> {
  return db.transaction().execute(async (trx) => {
    const now = new Date().toISOString();
    const inserted = await trx
      .insertInto("Order")
      .values({
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        deliveryMethod: payload.deliveryMethod,
        subtotal: payload.subtotal,
        deliveryFee: payload.deliveryFee,
        total: payload.subtotal + payload.deliveryFee,
        status: "pending",
        pixCode: `PIX-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 6)
          .toUpperCase()}`,
        notes: payload.notes ?? "",
        createdAt: now,
        updatedAt: now
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    if (payload.items.length > 0) {
      await trx
        .insertInto("OrderItem")
        .values(
          payload.items.map((item) => ({
            orderId: inserted.id,
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          }))
        )
        .execute();
    }

    const items = await loadItems(trx, [inserted.id]);
    return toOrder(inserted, items.get(inserted.id) ?? []);
  });
}

export async function updateOrderStatus(id: number, payload: OrderStatusInput): Promise<Order | null> {
  return db.transaction().execute(async (trx) => {
    const existing = await trx.selectFrom("Order").selectAll().where("id", "=", id).executeTakeFirst();
    if (!existing) {
      return null;
    }

    const updatedAt = new Date().toISOString();
    await trx
      .updateTable("Order")
      .set({ status: payload.status, updatedAt })
      .where("id", "=", id)
      .executeTakeFirst();

    const items = await loadItems(trx, [existing.id]);
    return toOrder(
      { ...existing, status: payload.status, updatedAt },
      items.get(existing.id) ?? []
    );
  });
}

export async function getOrderSummary(): Promise<OrderSummary> {
  const row = await db
    .selectFrom("Order")
    .select((eb) => [
      eb.fn.count<number>("id").as("totalOrders"),
      eb.fn
        .sum<number>(eb.case().when("status", "=", "paid").then(1).else(0).end())
        .as("paidOrders"),
      eb.fn.sum<number>("total").as("totalRevenue")
    ])
    .executeTakeFirst();

  if (!row) {
    return {
      totalOrders: 0,
      pendingOrders: 0,
      paidOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0
    };
  }

  const totalOrders = Number(row.totalOrders ?? 0);
  const paidOrders = Number(row.paidOrders ?? 0);
  const totalRevenue = Number(row.totalRevenue ?? 0);
  const pendingOrders = Math.max(totalOrders - paidOrders, 0);
  return {
    totalOrders,
    pendingOrders,
    paidOrders,
    totalRevenue,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
  };
}
