const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

async function request(path, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json"
    },
    signal
  });

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export function fetchProducts(options = {}) {
  return request("/products", options);
}

export function fetchProductById(id, options = {}) {
  return request(`/products/${id}`, options);
}
