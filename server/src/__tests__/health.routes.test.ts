import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../index";
import { seedDatabase } from "../lib/seed";
import * as healthService from "../services/health";

const app = createApp();

describe("health route", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reports API and database as healthy", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      api: { status: "ok" },
      database: { status: "ok" },
    });
  });

  it("reports degraded state when database check fails", async () => {
    vi.spyOn(healthService, "checkDatabaseHealth").mockResolvedValue({
      status: "error",
      error: "forced failure",
    });

    const response = await request(app).get("/api/health");

    expect(response.status).toBe(503);
    expect(response.body.api.status).toBe("ok");
    expect(response.body.database).toEqual({
      status: "error",
      error: "forced failure",
    });
  });
});
