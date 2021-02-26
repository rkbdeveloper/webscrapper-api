const puppeteer = require('puppeteer')

function screenShot(url){
    return new Promise((resolve, reject) => {
      (async () => {

        const browser = await puppeteer.launch({headless: true, defaultViewport:null, args:['--incognito'] });
        
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
        await page.goto(url, {
          waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
          timeout: 2147483647,
        })
  
        await page.waitForTimeout(1000)

        const links = await page.evaluate(() => Array.from(document.querySelectorAll('.video-feed-item-wrapper'), element => element.href));

        console.log(links);
        let vidLinks = [];
        await Promise.all(Array.from(links,async (link) => await getVideoLinks(link, vidLinks, browser)));

        console.log(vidLinks);
        await browser.close()
  
        resolve(vidLinks)
      })()
    })
}


async function getVideoLinks(url, vidLinks, browser){
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
    timeout: 2147483647,
  });

  const links = await page.evaluate(() => Array.from(document.querySelectorAll('video'), element => element.src));
  page.close();
  vidLinks.push(links[0]);
}

screenShot('https://www.tiktok.com/@chokemepapii');