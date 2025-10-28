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

export const featureFlags = {
  useMockData: parseBoolean(process.env.USE_MOCK_DATA, false),
};

export type FeatureFlags = typeof featureFlags;
