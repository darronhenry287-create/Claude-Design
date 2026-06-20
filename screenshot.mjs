import { chromium } from "playwright";

const url = "http://localhost:4173/";
// Use a system/pre-provisioned Chromium when CHROME_PATH is set; otherwise
// fall back to Playwright's managed browser.
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

// Wait for the preview server to accept connections.
let connected = false;
for (let i = 0; i < 40; i++) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 3000 });
    connected = true;
    break;
  } catch {
    await page.waitForTimeout(1000);
  }
}
if (!connected) {
  console.error("could not reach preview server");
  process.exit(1);
}

// Let fonts + product images settle.
try {
  await page.waitForLoadState("networkidle", { timeout: 15000 });
} catch {}
await page.waitForTimeout(1500);

await page.screenshot({ path: "preview-full.png", fullPage: true });
await page.screenshot({ path: "preview-top.png" }); // above-the-fold
await browser.close();
console.log("screenshots written");
