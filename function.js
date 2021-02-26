const puppeteer = require('puppeteer')
const CHROME_LOCATION = '/usr/bin/chromium-browser';

module.exports = {
  GetScreenShot : screenShot,
  GetFacebookData : getFacebookData,
}

function getChromeOptions(){
    const chromeOptions = {
      headless: true,
      executablePath: CHROME_LOCATION,
      defaultViewport: { width: 1280, height: 800 },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    };

    return chromeOptions;
}

// param1 string url 
function screenShot(url){
  return new Promise((resolve, reject) => {
    (async () => {

      console.log(`chrome options ${JSON.stringify(getChromeOptions())}!`)
      const browser = await puppeteer.launch(getChromeOptions());
    
      const page = await browser.newPage()
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
      await page.goto(url, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      })

      await autoScroll(page);
      await page.waitForTimeout(1000)

      const elems = await page.evaluate(() => Array.from(document.querySelectorAll('img.FFVAD'), element => element.src));

      console.log(elems);

      const buffer = await page.screenshot({
        fullPage: true,
        type: 'png',
        path:`${Date.now()}.png`
      })

      await browser.close()

      resolve(buffer)
    })()
  })
}


function getFacebookData(url){

}

function getSnapchatData(url){

}

function getMegaData(url){

}


// param1 string url 
function getImages(url){
  return new Promise((resolve, reject) => {
    (async () => {

      const browser = await puppeteer.launch(getChromeOptions);

      const page = await browser.newPage()

      await page.goto(url, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      })

      await page.waitForTimeout(1000)

      const buffer = await page.screenshot({
        fullPage: true,
        type: 'png'
      })

      await browser.close()

      resolve(buffer)
    })()
  })
}

function getVidoes(url){
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch(getChromeOptions);

      const page = await browser.newPage()

      await page.goto(url, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      })

      await page.waitForTimeout(1000)

      const buffer = await page.screenshot({
        fullPage: true,
        type: 'png'
      })

      await browser.close()

      resolve(buffer)
    })()
  })
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
