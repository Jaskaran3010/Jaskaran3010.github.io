import { chromium } from "playwright";

const SCRATCH = "/private/tmp/claude-502/-Users-jsingh-Profile/32425b4e-a9df-4b2e-8a32-b5e1c7f8e5e8/scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

async function inspect(url, name, scrollTo) {
  await page.goto(url, { waitUntil: "networkidle" });
  if (scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "center" });
    }, scrollTo);
  }
  await page.waitForTimeout(2500);
  const report = await page.evaluate(() => {
    return [...document.querySelectorAll("video")].map((v) => ({
      src: v.querySelector("source")?.src ?? v.src,
      readyState: v.readyState,
      paused: v.paused,
      currentTime: Math.round(v.currentTime * 100) / 100,
      error: v.error?.message ?? null,
      poster: v.poster || null,
      visible: v.getBoundingClientRect().width > 0,
    }));
  });
  await page.screenshot({ path: `${SCRATCH}/${name}.png` });
  console.log(`\n=== ${url} ===`);
  console.log(JSON.stringify(report, null, 2) || "no <video> elements");
  if (!report.length) console.log("NO <video> ELEMENTS IN DOM");
}

await inspect("http://localhost:3111/projects/scrambled-egg", "scrambled-page");
await inspect("http://localhost:3111/", "home-scrolled", 'a[href="/projects/scrambled-egg"]');

console.log("\nConsole/page errors:", errors.length ? errors : "none");
await browser.close();
