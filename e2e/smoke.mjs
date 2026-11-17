// End-to-end smoke test against a running server.
// Usage: npm run dev                  (in one terminal)
//        node e2e/smoke.mjs [baseUrl]  (in another)
// Uses your installed Chrome first, then Playwright's bundled Chromium, then Edge,
// so no browser download is needed. Force one with E2E_BROWSER=chrome|msedge.
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

async function launchBrowser() {
  const forced = process.env.E2E_BROWSER;
  const attempts = forced ? [forced] : ["chrome", "bundled", "msedge"];
  for (const channel of attempts) {
    try {
      return await chromium.launch(channel === "bundled" ? {} : { channel });
    } catch {
      // try the next browser
    }
  }
  throw new Error("No browser found. Install Chrome or Edge, or run `npx playwright install chromium`.");
}

const browser = await launchBrowser();
console.log(`Browser: ${browser.browserType().name()} ${browser.version()}`);

// ---------- Desktop ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // The deliberate empty submit returns 422; anything else logged as an error is a failure.
  page.on("console", (m) => m.type() === "error" && !m.text().includes("422") && errors.push(m.text()));
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  const res = await page.goto(BASE, { waitUntil: "networkidle" });
  check("page returns 200", res.status() === 200, String(res.status()));
  check("h1 is the hook", (await page.locator("h1").innerText()).includes("9 minutes"));
  check("title and description set", (await page.title()).includes("Ledgerline") &&
    !!(await page.locator('meta[name="description"]').getAttribute("content")));

  // Nav anchors resolve to sections
  for (const id of ["product", "roi", "pricing", "faq", "demo"]) {
    check(`anchor #${id} exists`, (await page.locator(`#${id}`).count()) === 1);
  }

  // Live feed animates (rows change over time)
  const firstRow = () => page.locator('[aria-label="Recently reconciled transactions"] li').first().innerText();
  const before = await firstRow();
  await page.waitForTimeout(2200);
  check("hero feed cycles", before !== (await firstRow()));

  // Pricing toggle
  const scalePrice = () => page.locator("#pricing article").nth(1).locator(".tabular-nums").first().innerText();
  check("annual price shown by default", (await scalePrice()).trim() === "599");
  await page.getByRole("switch", { name: "Bill annually" }).click();
  await page.waitForTimeout(500);
  check("monthly toggle switches price", (await scalePrice()).trim() === "749");

  // ROI slider via keyboard
  const net = page.locator("#roi [aria-live=polite]");
  const netBefore = await net.innerText();
  const thumb = page.getByRole("slider", { name: "Hours spent reconciling / month" });
  await thumb.focus();
  for (let i = 0; i < 6; i++) await thumb.press("ArrowRight");
  check("ROI recalculates on slider input", netBefore !== (await net.innerText()), `${netBefore} -> ${await net.innerText()}`);

  // FAQ
  const q = page.getByRole("button", { name: /trust AI with my books/ });
  await q.click();
  check("FAQ expands", (await q.getAttribute("aria-expanded")) === "true");

  // Form: empty submit shows field errors
  await page.locator("#demo").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Book my demo/ }).click();
  await page.waitForTimeout(600);
  check("empty submit shows field errors", (await page.locator("#demo p.text-danger:not(:empty)").count()) >= 5);

  // Form: valid submit
  const email = `qa+${Date.now()}@saltmere.eu`;
  await page.fill("#fullName", "Lena Brandt");
  await page.fill("#workEmail", email);
  await page.fill("#company", "Saltmere QA");
  const pick = async (id, label) => {
    await page.locator(`#${id}`).click();
    await page.getByRole("option", { name: label }).click();
  };
  await pick("role", "CFO / Head of Finance");
  await pick("revenueBand", "€5M – €10M");
  await pick("ordersBand", "10,000 – 50,000 / month");
  await page.fill("#storesCount", "3");
  await page.getByRole("button", { name: /Book my demo/ }).click();
  const status = page.getByRole("status");
  await status.waitFor({ timeout: 10000 }).catch(() => {});
  check("valid submit shows hot-lead confirmation", (await status.innerText().catch(() => "")).includes("fast lane"));

  // API contract
  const bad = await page.request.post(`${BASE}/api/demo`, { data: { fullName: "x" } });
  check("API rejects invalid payload with 422", bad.status() === 422);
  const junk = await page.request.post(`${BASE}/api/demo`, { headers: { "content-type": "application/json" }, data: Buffer.from("{oops") });
  check("API rejects malformed JSON with 400", junk.status() === 400);

  const cls = await page.evaluate(() => window.__cls);
  check("cumulative layout shift < 0.1", cls < 0.1, cls.toFixed(4));
  check("no console or page errors", errors.length === 0, errors.slice(0, 2).join(" | "));
  await page.close();
}

// ---------- Mobile ----------
for (const width of [390, 320]) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`no horizontal scroll at ${width}px`, overflow <= 0, `${overflow}px`);
  await page.close();
}

// ---------- Reduced motion ----------
{
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const anim = await page.locator(".enter").first().evaluate((el) => getComputedStyle(el).animationName);
  check("hero entrance off under reduced motion", anim === "none", anim);
  const op = await page.locator("h1").evaluate((el) => getComputedStyle(el.closest(".enter")).opacity);
  check("hero visible under reduced motion", op === "1");
  await page.close();
}

// ---------- No JavaScript ----------
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE);
  check("content renders without JS", (await page.locator("h1").innerText()).includes("9 minutes"));
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
