import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  test: {
    coverage: {
      reporter: ["json", "json-summary", "text"],
      reportOnFailure: true,
    },
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
