const puppeteer = require("puppeteer");
const clearModule = require("clear-module");

// Tell TypeScript to forget all modules previously required.
clearModule.all();

interface Product {
  name: string;
  price: string;
  url: string;
}

async function scrapeProducts(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the homepage
  await page.goto(
    "https://www.etsy.com/c/jewelry/earrings/stud-earrings?explicit=1&ref=catcard-1214-508239208"
  );

  // Wait for the page to load completely
  await page.waitForSelector("a.listing-link");

  // Extract information about the first 10 products
  const products: Product[] = await page.evaluate(() => {
    const productElements = document.querySelectorAll(
      ".listing-link.wt-display-inline-block"
    );
    const products: Product[] = [];

    for (let i = 0; i < Math.min(10, productElements.length); i++) {
      const product: Product = { name: "", price: "", url: "" };
      const element = productElements[i];

      // Extract product name
      const nameElement = element.querySelector(
        ".wt-text-caption.v2-listing-card__title"
      );
      if (nameElement) product.name = nameElement.textContent.trim();

      // Extract product price
      const priceElement = element.querySelector(".lc-price");
      if (priceElement) product.price = priceElement.innerText.trim();

      // Extract product URL
      product.url = element.getAttribute("href");

      products.push(product);
    }

    return products;
  });

  // Log information about the first 10 products
  console.log(products);

  await browser.close();
}

scrapeProducts();
