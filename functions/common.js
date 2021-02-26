
const puppeteer = require('puppeteer')




module.exports = {
    GetImageLinks: GetImageLinks,
    GetVideoLinks: GetVideoLinks,
}

function getChromeOptions(){
    const chromeOptions = {
      headless: true,
      defaultViewport: null,
      args: [
          '--incognito',
          '--no-sandbox',
          '--disable-setuid-sandbox',
      ],
    };

    return chromeOptions;
}

function GetImageLinks(url, regex){
    return new Promise((resolve, reject) => {
        (async () => {
          const browser = await puppeteer.launch(getChromeOptions());
          const page = await browser.newPage()
          await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
          
          await page.goto(url, {
            waitUntil: ['load', 'networkidle0', 'domcontentloaded']
          })
    
          await autoScroll(page);
          await page.waitForTimeout(3000)
      
          const links = await page.evaluate((regex) => {return Array.from(document.querySelectorAll(regex), element => element.src)}, regex);

          await browser.close()

          resolve(links)
        })()
      })
}

function GetVideoLinks(url, regex){
    
}


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var start = new Date()
            var timer = setInterval(() => {
                console.log('Scrolling');
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                var end = new Date() - start
                if(totalHeight >= scrollHeight || end > 50000){
                  console.log('Scrolling DONE');
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
  }