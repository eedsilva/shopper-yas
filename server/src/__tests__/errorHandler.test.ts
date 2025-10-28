import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../index";

describe("error handler", () => {
  it("returns json payload with request id for handled errors", async () => {
    const app = createApp((expressApp) => {
      expressApp.get("/handled-error", () => {
        const error = new Error("Bad Request");
        (error as Error & { status?: number }).status = 400;
        throw error;
      });
    });

    const response = await request(app).get("/handled-error");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: "Bad Request",
    });
    expect(typeof response.body.requestId).toBe("string");
    expect(response.body.requestId.length).toBeGreaterThan(0);
  });

  it("masks server errors and logs them", async () => {
    const app = createApp((expressApp) => {
      expressApp.get("/server-error", () => {
        throw new Error("Database exploded");
      });
    });

    const response = await request(app).get("/server-error");

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      success: false,
      message: "Internal Server Error",
    });
    expect(typeof response.body.requestId).toBe("string");
  });
});
