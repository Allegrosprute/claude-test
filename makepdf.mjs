// Renders competitor-report.html to a print-ready PDF.
// The @media print block in the page does the layout work; this script only
// opens every dossier (collapsed cards would print empty) and paginates.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));

const CHROME = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const b = await chromium.launch({ executablePath: CHROME });
const ctx = await b.newContext({ colorScheme: "light" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", e => errs.push(e.message));

await p.goto("file://" + join(HERE, "competitor-report.html"), { waitUntil: "load" });
await p.waitForTimeout(600);

// Clear any filter state, then open all dossiers.
await p.evaluate(() => {
  document.querySelectorAll('.card-head[aria-expanded="false"]').forEach(h => h.click());
});
await p.waitForTimeout(400);

const open = await p.evaluate(() => ({
  cards: document.querySelectorAll(".card").length,
  open: document.querySelectorAll(".card-body.open").length,
  rows: document.querySelectorAll("#tablehost tbody tr").length
}));

const foot = `<div style="width:100%;font:8pt 'Liberation Sans',Arial,sans-serif;color:#6B7877;
  padding:0 12mm;display:flex;justify-content:space-between;">
  <span>Wettbewerbsübersicht AI Role-Play / Sales Training DACH · Stand 11.08.2026</span>
  <span>Seite <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;

await p.pdf({
  path: join(HERE, "Wettbewerbsuebersicht-DACH-2026-08-11.pdf"),
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<div></div>",
  footerTemplate: foot,
  margin: { top: "14mm", bottom: "18mm", left: "12mm", right: "12mm" }
});

console.log("cards:", open.cards, "expanded:", open.open, "table rows:", open.rows,
            "| pageerrors:", errs.length ? errs : "none");
await b.close();
