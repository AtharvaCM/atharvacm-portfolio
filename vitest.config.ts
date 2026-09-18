import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(new URL(".", import.meta.url)), "src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Agent worktrees under .claude/ hold full repo copies with their own node_modules.
    exclude: [...configDefaults.exclude, ".claude/**"],
    coverage: {
      reporter: ["text", "html"],
      include: [
        "src/lib/**/*.ts",
        "src/components/**/*.{ts,tsx}",
        "src/app/api/contact/route.ts"
      ],
      exclude: [
        "src/components/**/*.test.{ts,tsx}",
        "src/lib/**/*.test.ts"
      ]
    }
  }
});
