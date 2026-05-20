import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: __dirname, size: { width: 1440, height: 900 } },
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });

  // Wait for initial load & animations
  await page.waitForTimeout(3000);

  // Get total scrollable height
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 900;
  const scrollStep = 200;
  const stepDelay = 120; // ms between each small scroll — smooth & cinematic

  // Scroll down slowly
  let currentScroll = 0;
  while (currentScroll < totalHeight - viewportHeight) {
    await page.evaluate((step) => window.scrollBy(0, step), scrollStep);
    currentScroll += scrollStep;
    await page.waitForTimeout(stepDelay);
  }

  // Pause at bottom
  await page.waitForTimeout(2000);

  // Scroll back up
  while (currentScroll > 0) {
    await page.evaluate((step) => window.scrollBy(0, -step), scrollStep);
    currentScroll -= scrollStep;
    await page.waitForTimeout(stepDelay);
  }

  // Pause at top
  await page.waitForTimeout(2000);

  // Close to finalize video
  await context.close();
  await browser.close();

  console.log('✅ Recording saved to:', __dirname);
})();
