const puppeteer = require("puppeteer");

interface ProductLink {
  href: string | null;
}

interface ProductDetails {
  name: string;
  price: string;
  description: string;
  sizes: string[];
  imageURL: string | null;
}

async function scrapeProducts(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.etsy.com/c/jewelry/earrings/stud-earrings?explicit=1&ref=catcard-1214-508239208");
  await page.waitForSelector("a.listing-link");

  const productLinks: string[] = await page.evaluate((): string[] => {
    const productElements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a.listing-link");
    const productLinks: string[] = [];

    productElements.forEach((element) => {
      if (element.href) {
        productLinks.push(element.href);
      }
    });

    return productLinks;
  });

  for (const productLink of productLinks) {
    await page.goto(productLink);
    // Example waitForSelector commented out as it might not be necessary or selector might be different.
    // await page.waitForSelector(".product-detail");

    const productDetails: ProductDetails = await page.evaluate((): ProductDetails => {
      const details: Partial<ProductDetails> = {};

      const nameElement = document.querySelector(".wt-text-caption.v2-listing-card__title");
      const priceElement = document.querySelector(".lc-price");
      const descriptionElement = document.querySelector(".wt-text-body-01.wt-break-word");
      const sizeElements = document.querySelectorAll(".wt-text-body-01.wt-break-word");
      const imageElement = document.querySelector(".wt-max-width-full.wt-horizontal-center.wt-vertical-center.carousel-image.wt-rounded");

      details.name = nameElement?.textContent?.trim() || '';
      details.price = priceElement?.textContent?.trim() || '';
      details.description = descriptionElement?.textContent?.trim() || '';
      details.sizes = Array.from(sizeElements).map((element) => element.textContent.trim());
      details.imageURL = imageElement?.getAttribute("src");

      return details as ProductDetails;
    });

    console.log(productDetails);
  }

  await browser.close();
}

scrapeProducts();