import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup.js",
  },
});
