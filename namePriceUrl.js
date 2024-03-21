const puppeteer = require("puppeteer");

const clearModule = require("clear-module");
clearModule.all();

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
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(
      ".listing-link.wt-display-inline-block "
    );
    const products = [];

    for (let i = 0; i < Math.min(10, productElements.length); i++) {
      const product = {};
      const element = productElements[i];

      // Extract product name
      product.name = element
        .querySelector(".wt-text-caption.v2-listing-card__title")
        .textContent.trim();

      //   // Extract product price
      product.price = element.querySelector(".lc-price").innerText.trim();

      // Extract product URL
      product.url = element.getAttribute("href");

      products.push(product);
    }

    return products;
  });

  // Log information about the first 10 products
  console.log(products);
  //   products.forEach((product, index) => {
  //     console.log(`Product ${index + 1}:`);
  //     console.log(`Name: ${product.name}`);
  //     console.log(`Price: ${product.price}`);
  //     console.log(`URL: ${product.url}`);
  //     console.log("---------------------");
  //   });
}

scrapeProducts();
