const puppeteer = require("puppeteer");
// const clearModule = require("clear-module");
// clearModule.all();

async function scrapeProducts() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the homepage
  await page.goto(
    "https://www.etsy.com/c/jewelry/earrings/stud-earrings?explicit=1&ref=catcard-1214-508239208"
  );

  // Wait for the page to load completely
  await page.waitForSelector("a.listing-link");

  // Extract information about the first 10 products
  const productLinks = await page.evaluate(() => {
    const productElements = document.querySelectorAll("a.listing-link");
    const productLinks = [];

    for (let i = 0; i < Math.min(10, productElements.length); i++) {
      productLinks.push(productElements[i].getAttribute("href"));
    }

    return productLinks;
  });

  // Loop through each product link to scrape detailed information
  for (const productLink of productLinks) {
    // Navigate to the product detail page
    await page.goto(productLink);

    //Wait for the product detail page to load completely
    // await page.waitForSelector(".product-detail");

    //Extract detailed information about the product
    const productDetails = await page.evaluate(() => {
      const details = {};

      // Extract product name
      details.name = document
        .querySelector(".wt-text-caption.v2-listing-card__title")
        .textContent.trim();

      // Extract product price
      details.price = document.querySelector(".lc-price").textContent.trim();

      // // Extract product description
      details.description = document
        .querySelector(".wt-text-body-01.wt-break-word")
        .textContent.trim();

      // Extract available sizes (if available)
      const sizeElements = document.querySelectorAll(
        ".wt-text-body-01.wt-break-word"
      );
      details.sizes = Array.from(sizeElements).map((element) =>
        element.textContent.trim()
      );

      // // Extract at least one image URL
      details.imageURL = document
        .querySelector(
          ".wt-max-width-full.wt-horizontal-center.wt-vertical-center.carousel-image.wt-rounded"
        )
        .getAttribute("src");

      return details;
    });

    // Log or store the detailed information about the product
    console.log(productDetails);
    // console.log("Name:", productDetails.name);
    // console.log("Price:", productDetails.price);
    // console.log("Description:", productDetails.description);
    // console.log("Available Sizes:", productDetails.sizes.join(", "));
    // console.log("Image URL:", productDetails.imageURL);
    // console.log("--------------------------------------");
  }
}

scrapeProducts();
