const puppeteer = require("puppeteer");

(async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(
    "https://www.etsy.com/listing/1604611959/14k-gold-diamond-station-necklace?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sc_gallery-1-1&pro=1&plkey=aa2e4f15db105b316410cd3784cc8134beb61dcc%3A1604611959"
  );

  await page.waitForSelector("#variation-selector-0");

  await page.click("#variation-selector-0");

  // await page.waitForTimeout(1000);

  const optionValue = "4043352115";
  await page.select("#variation-selector-0", optionValue);

  await page.waitForSelector("#variation-selector-1");
  await page.click("#variation-selector-1");
  const optionValueSec = "4023639428";
  await page.select("#variation-selector-1", optionValueSec);

  await page.click('button[type="submit"]');
})();
