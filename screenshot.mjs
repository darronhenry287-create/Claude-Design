import { chromium } from "playwright";

// Configurable via env so the same script can shoot the storefront or the studio:
//   SHOT_URL=http://localhost:4173/studio.html SHOT_OUT=preview-studio.png SHOT_FULL=0
const url = process.env.SHOT_URL || "http://localhost:4173/";
const out = process.env.SHOT_OUT || "preview-full.png";
const fullPage = process.env.SHOT_FULL !== "0";
const width = Number(process.env.SHOT_W || 1440);
const height = Number(process.env.SHOT_H || 900);

// Use a system/pre-provisioned Chromium when CHROME_PATH is set; otherwise
// fall back to Playwright's managed browser.
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width, height },
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
  console.error("could not reach preview server at", url);
  process.exit(1);
}

try {
  await page.waitForLoadState("networkidle", { timeout: 15000 });
} catch {}
await page.waitForTimeout(1500);

await page.screenshot({ path: out, fullPage });
await browser.close();
console.log("wrote", out);
