/**
 * Visual QA — captures key sections at desktop + mobile into .shots/.
 * Usage: npm run shots            (uses http://localhost:3000)
 *        BASE=http://localhost/robotic npm run shots
 *
 * Requires the dev server (or XAMPP) running and the Chromium browser:
 *   npx playwright install chromium
 */
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

const BASE = process.env.BASE ?? "http://localhost:3000"
const OUT = ".shots"
const sections = ["roadmap", "programmieren", "projekte", "materialien", "lehrplaene", "kontakt"]
const mobileSections = ["roadmap", "projekte"]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

async function capture(viewport, label, ids) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 })
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 })
  await page.waitForTimeout(1500)
  for (const id of ids) {
    const el = await page.$(`#${id}`)
    if (!el) { console.log(`MISSING #${id} (${label})`); continue }
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${OUT}/${label}-${id}.png` })
    console.log(`OK ${label}-${id}`)
  }
  await page.close()
}

await capture({ width: 1440, height: 900 }, "desktop", sections)
await capture({ width: 390, height: 844 }, "mobile", mobileSections)

await browser.close()
console.log(`done → ${OUT}/`)
