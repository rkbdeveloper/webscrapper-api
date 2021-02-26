const commonFunction = require('./common');

module.exports = {
    GetImage: GetImageLinks,
}

const INSTA_IMAGE_REGEX = 'img.FFVAD';

async function GetImageLinks(url){
    const links = await commonFunction.GetImageLinks(url, INSTA_IMAGE_REGEX);
    return JSON.stringify(links);
} 
    