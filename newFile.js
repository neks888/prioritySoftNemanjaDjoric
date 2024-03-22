const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // You can set headless: true if you don't want the browser UI to show
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(
    "https://www.etsy.com/listing/1683697813/black-fire-opal-earrings-faceted-black?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sc_gallery-1-1&pro=1&plkey=5433da3a991270264d2e3902cb54c31061d6a69c%3A1683697813"
  );

  // Find the product and click on its 'Add to Cart' button
  await page.waitForSelector(".wt-btn wt-btn--filled.wt-width-full"); // Assuming '.product' is a class identifying the product
  const addToCartButton = await page.$(".product .add-to-cart-button"); // Assuming '.add-to-cart-button' is a class identifying the 'Add to Cart' button

  // await addToCartButton.click();
  // Wait for the cart to update (you may need to adjust the selector based on your website)
  // await page.waitForSelector(".cart-updated-message");
  // Check if the product is successfully added to the cart
  // const cartItems = await page.evaluate(() => {
  //   const cartItemsCount = document.querySelectorAll(".cart-item").length;
  //   return cartItemsCount;
  // });
  // if (cartItems > 0) {
  //   console.log("Product successfully added to the cart!");
  // } else {
  //   console.log("Failed to add the product to the cart.");
  // }
})();
