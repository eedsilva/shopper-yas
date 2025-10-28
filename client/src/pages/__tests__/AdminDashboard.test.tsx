import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AdminAuthProvider } from "../../contexts/AdminAuthContext";
import { LocalizationProvider } from "../../contexts/LocalizationContext";
import AdminDashboard from "../AdminDashboard";
import type { Product } from "../../types";

interface MockResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

function createResponse(body: unknown, status = 200): MockResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body)
  };
}

describe("AdminDashboard", () => {
  const baseUrl = "http://localhost:4000/api";
  const now = new Date().toISOString();
  let fetchMock: ReturnType<typeof vi.fn>;
  let serverProducts: Product[];

  const summary = {
    totalProducts: 2,
    totalStock: 42,
    totalSold: 12,
    inventoryValue: 1200,
    salesRevenue: 3600,
    potentialRevenue: 4200
  };

  const categories = [
    { category: "Outerwear", stock: 20, sold: 8, inventoryValue: 600, salesRevenue: 1800 },
    { category: "Dresses", stock: 22, sold: 4, inventoryValue: 600, salesRevenue: 1800 }
  ];

  const renderDashboard = () => {
    return render(
      <LocalizationProvider>
        <AdminAuthProvider>
          <AdminDashboard />
        </AdminAuthProvider>
      </LocalizationProvider>
    );
  };

  beforeEach(() => {
    serverProducts = [
      {
        id: 1,
        name: "Heritage Blazer",
        description: "Structured tailoring with recycled lining.",
        price: 420,
        category: "Outerwear",
        image: null,
        tags: ["featured"],
        stock: 20,
        sold: 5,
        cost: 160,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: "Sculptural Dress",
        description: "Fluid pleats with organic silk.",
        price: 380,
        category: "Dresses",
        image: null,
        tags: ["new"],
        stock: 22,
        sold: 7,
        cost: 140,
        createdAt: now,
        updatedAt: now
      }
    ];

    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      const method = init?.method ?? "GET";

      if (url === `${baseUrl}/products` && method === "GET") {
        return createResponse(serverProducts);
      }

      if (url === `${baseUrl}/products/analytics/summary`) {
        return createResponse(summary);
      }

      if (url === `${baseUrl}/products/analytics/categories`) {
        return createResponse(categories);
      }

      if (url === `${baseUrl}/products` && method === "POST") {
        const payload = JSON.parse(String(init?.body ?? "{}"));
        const created: Product = {
          ...payload,
          id: 3,
          createdAt: now,
          updatedAt: now,
          image: payload.image ?? null,
          tags: payload.tags ?? []
        };
        serverProducts = [created, ...serverProducts];
        return createResponse(created, 201);
      }

      const productIdMatch = url.match(/\/products\/(\d+)$/);
      if (productIdMatch && method === "PATCH") {
        const targetId = Number(productIdMatch[1]);
        const payload = JSON.parse(String(init?.body ?? "{}"));
        serverProducts = serverProducts.map((product) =>
          product.id === targetId
            ? {
                ...product,
                ...payload,
                tags: payload.tags ?? product.tags,
                updatedAt: now
              }
            : product
        );
        const updated = serverProducts.find((product) => product.id === targetId);
        return createResponse(updated ?? null);
      }

      if (productIdMatch && method === "DELETE") {
        const targetId = Number(productIdMatch[1]);
        serverProducts = serverProducts.filter((product) => product.id !== targetId);
        return createResponse(null, 204);
      }

      throw new Error(`Unhandled request: ${method} ${url}`);
    });

    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(window, "confirm").mockReturnValue(true);
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders inventory and supports creating a product", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findByRole("heading", { name: /catalog overview/i });
    expect(screen.getByText(/Heritage Blazer/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /new product/i }));

    const drawer = await screen.findByRole("dialog", { name: /create product/i });
    const form = within(drawer);
    const nameField = form.getByLabelText(/name/i);
    await user.clear(nameField);
    await user.type(nameField, "Coastline Top");
    await user.clear(form.getByLabelText(/category/i));
    await user.type(form.getByLabelText(/category/i), "Tops");
    await user.clear(form.getByLabelText(/^price/i));
    await user.type(form.getByLabelText(/^price/i), "120");
    await user.clear(form.getByLabelText(/stock/i));
    await user.type(form.getByLabelText(/stock/i), "12");
    await user.clear(form.getByLabelText(/sold/i));
    await user.type(form.getByLabelText(/sold/i), "1");
    await user.clear(form.getByLabelText(/custo|cost/i));
    await user.type(form.getByLabelText(/custo|cost/i), "40");

    await user.click(form.getByRole("button", { name: /create/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}/products`,
      expect.objectContaining({ method: "POST" })
    ));

    const table = await screen.findByRole("table");
    await within(table).findByRole("rowheader", { name: /coastline top/i });
  });

  it("supports editing a product", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findByText(/Heritage Blazer/);
    await user.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    const drawer = await screen.findByRole("dialog", { name: /edit product/i });
    const form = within(drawer);
    const nameField = form.getByLabelText(/name/i);
    await user.clear(nameField);
    await user.type(nameField, "Heritage Blazer Updated");

    await user.click(form.getByRole("button", { name: /save changes/i }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        `${baseUrl}/products/1`,
        expect.objectContaining({ method: "PATCH" })
      )
    );

    const table = await screen.findByRole("table");
    await within(table).findByRole("rowheader", { name: /heritage blazer updated/i });
  });

  it("removes a product with delete", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const table = await screen.findByRole("table");
    await within(table).findByRole("rowheader", { name: /sculptural dress/i });
    await user.click(within(table).getAllByRole("button", { name: /delete/i })[1]);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        `${baseUrl}/products/2`,
        expect.objectContaining({ method: "DELETE" })
      )
    );

    await waitFor(() =>
      expect(within(table).queryByRole("rowheader", { name: /sculptural dress/i })).not.toBeInTheDocument()
    );
  });
});
