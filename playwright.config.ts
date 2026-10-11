import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:5187",
    launchOptions: { channel: "chrome" },
    headless: true,
  },
  webServer: {
    command: "npm.cmd run dev -- --port 5187 --strictPort",
    url: "http://127.0.0.1:5187",
    reuseExistingServer: false,
  },
  reporter: "list",
});
