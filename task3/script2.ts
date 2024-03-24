const puppeteer = require("puppeteer");

(async () => {
  try {
    // Launch browser and open a new page
    const browser = await puppeteer.launch({ headless: false }); // Use headless: true for production environments
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto(
      "https://www.etsy.com/listing/1604611959/14k-gold-diamond-station-necklace?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sc_gallery-1-1&pro=1&plkey=aa2e4f15db105b316410cd3784cc8134beb61dcc%3A1604611959"
    );

    // Wait for the first variation selector to be clickable and select an option
    await page.waitForSelector("#variation-selector-0", { visible: true });
    await page.click("#variation-selector-0");
    const optionValue: string = "4043352115";
    await page.select("#variation-selector-0", optionValue);

    // Wait for the second variation selector to be clickable and select an option
    await page.waitForSelector("#variation-selector-1", { visible: true });
    await page.click("#variation-selector-1");
    const optionValueSec: string = "4023639428";
    await page.select("#variation-selector-1", optionValueSec);

    // Wait for the submit button to be clickable and click it
    await page.waitForSelector('button[type="submit"]', { visible: true });
    await page.click('button[type="submit"]');
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
