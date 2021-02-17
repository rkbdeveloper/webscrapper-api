const puppeteer = require('puppeteer')

module.exports = {
  GetScreenShot : screenShot,
  GetFacebookData : getFacebookData,
}

function getChromeOptions(){
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

    return chromeOptions;
}

// param1 string url 
function screenShot(url){
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