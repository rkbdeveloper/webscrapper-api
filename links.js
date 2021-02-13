const puppeteer = require('puppeteer')

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    ;(async () => {

    const chromeOptions = {
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
    };
      const browser = await puppeteer.launch(chromeOptions);

      const page = await browser.newPage()

      await page.goto(url, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      })

      await page.waitFor(1000)

      await page.emulateMedia('screen')

      const buffer = await page.screenshot({
        fullPage: true,
        type: 'png'
      })

      await browser.close()

      resolve(buffer)
    })()
  })
}