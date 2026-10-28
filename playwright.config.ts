import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4321",
    browserName: "chromium",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ["--no-sandbox"],
    },
  },
  projects: [1280, 390, 320].flatMap(width =>
    (["light", "dark"] as const).map(colorScheme => ({
      name: `${width}-${colorScheme}`,
      use: { viewport: { width, height: 900 }, colorScheme },
    }))
  ),
  webServer: {
    command: "pnpm preview --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
});
