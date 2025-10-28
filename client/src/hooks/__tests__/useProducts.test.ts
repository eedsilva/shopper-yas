import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useProducts } from "../useProducts";
import type { Product } from "../../types";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Mock Product",
    description: "A description",
    price: 100,
    category: "Mock Category",
    image: "https://example.com/image.jpg",
    tags: ["featured", "new"],
    stock: 10,
    sold: 5,
    cost: 40,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Second Product",
    description: "Another description",
    price: 200,
    category: "Another Category",
    image: "https://example.com/other.jpg",
    tags: ["classic"],
    stock: 8,
    sold: 2,
    cost: 60,
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2024-01-04T00:00:00.000Z"
  }
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useProducts", () => {
  it("loads products and derives spotlight and showcase collections", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.spotlight).toEqual(mockProducts[0]);
    expect(result.current.showcase).toEqual(mockProducts.slice(1, 7));
    expect(result.current.error).toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:4000/api/products",
      expect.objectContaining({
        method: "GET",
        headers: { Accept: "application/json" },
        signal: expect.any(Object)
      })
    );
  });

  it("records errors when the request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: () => Promise.resolve({})
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toContain("503");
    expect(result.current.products).toHaveLength(0);
  });
});
