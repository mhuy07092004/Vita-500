import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:5173/buy', { waitUntil: 'networkidle' })
await page.keyboard.press('Escape')
await page.locator('img[alt="Buy Vita500"]').waitFor({ state: 'visible' })
await page.waitForTimeout(300)
await page.screenshot({
  path: '/Users/haydenloi/My Project/Vita 500/.tmp-crops/buy-mobile-full.png',
  fullPage: true,
})
await browser.close()
