const puppeteer = require('puppeteer')

function screenShot(url){
    return new Promise((resolve, reject) => {
      (async () => {

        const browser = await puppeteer.launch({headless: false, defaultViewport:null, args:['--incognito'] });
        const page = await browser.newPage()
  
        await page.goto(url, {
          waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
          timeout: 2147483647,
        })
  
        await page.waitForTimeout(1000)

        const links = await page.evaluate(() => Array.from(document.querySelectorAll('.video-feed-item-wrapper'),( async (element) => {
            const subPage = await browser.newPage()
  
            await subPage.goto(element.href, {
            waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
            timeout: 2147483647,
            })

            const videoURL = await subPage.evaluate(() => Array.from(document.querySelectorAll('.video-player'), subElement => subElement.src))
            
            return videoURL;
        })));

        console.log(links);
        const buffer = await page.screenshot({
          fullPage: true,
          type: 'png'
        })
  
        await browser.close()
  
        resolve(buffer)
      })()
    })
}


screenShot('https://www.tiktok.com/@chokemepapii');