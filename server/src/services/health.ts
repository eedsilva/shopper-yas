import { db } from "../lib/db";

export interface HealthStatus {
  status: "ok" | "error";
  error?: string;
}

export async function checkDatabaseHealth(): Promise<HealthStatus> {
  try {
    await db.selectFrom("Product").select("id").limit(1).executeTakeFirst();
    return { status: "ok" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: "error", error: message };
  }
}
