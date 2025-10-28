import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, ".."), "");
  const serverPort = env.PORT || "4000";
  const apiBaseUrl = env.VITE_API_BASE_URL || `http://localhost:${serverPort}/api`;

  let proxyTarget = `http://localhost:${serverPort}`;
  try {
    const parsedApiBaseUrl = new URL(apiBaseUrl);
    proxyTarget = `${parsedApiBaseUrl.origin}${parsedApiBaseUrl.pathname.replace(/\/$/, "")}`;
  } catch {
    // fall back to the default localhost target when the URL is invalid
  }

  return {
    plugins: [react()],
    envDir: path.resolve(__dirname, ".."),
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true
        }
      }
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      css: true
    }
  };
});
