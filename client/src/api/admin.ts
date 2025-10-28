import { API_BASE_URL, ADMIN_ACCESS_CODE, USE_MOCK_DATA } from "../config";

interface LoginResponse {
  success: boolean;
}

export async function login(code: string): Promise<boolean> {
  const normalized = code.trim();
  if (!normalized) {
    return false;
  }

  if (USE_MOCK_DATA) {
    return normalized === ADMIN_ACCESS_CODE;
  }

  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: normalized }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      return false;
    }
    throw new Error(`Login failed with status ${response.status}`);
  }

  const data = (await response.json()) as LoginResponse;
  return Boolean(data.success);
}
