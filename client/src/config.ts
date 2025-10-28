function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  switch (value.trim().toLowerCase()) {
    case "1":
    case "true":
    case "yes":
    case "y":
      return true;
    case "0":
    case "false":
    case "no":
    case "n":
      return false;
    default:
      return defaultValue;
  }
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";
export const USE_MOCK_DATA = parseBoolean(import.meta.env.VITE_USE_MOCK_DATA, false);
export const ADMIN_ACCESS_CODE = import.meta.env.VITE_ADMIN_ACCESS_CODE ?? "admin";
