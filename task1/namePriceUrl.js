var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var puppeteer = require("puppeteer");
var clearModule = require("clear-module");
// Tell TypeScript to forget all modules previously required.
clearModule.all();
function scrapeProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    // Navigate to the homepage
                    return [4 /*yield*/, page.goto("https://www.etsy.com/c/jewelry/earrings/stud-earrings?explicit=1&ref=catcard-1214-508239208")];
                case 3:
                    // Navigate to the homepage
                    _a.sent();
                    // Wait for the page to load completely
                    return [4 /*yield*/, page.waitForSelector("a.listing-link")];
                case 4:
                    // Wait for the page to load completely
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var productElements = document.querySelectorAll(".listing-link.wt-display-inline-block");
                            var products = [];
                            for (var i = 0; i < Math.min(10, productElements.length); i++) {
                                var product = { name: "", price: "", url: "" };
                                var element = productElements[i];
                                // Extract product name
                                var nameElement = element.querySelector(".wt-text-caption.v2-listing-card__title");
                                if (nameElement)
                                    product.name = nameElement.textContent.trim();
                                // Extract product price
                                var priceElement = element.querySelector(".lc-price");
                                if (priceElement)
                                    product.price = priceElement.innerText.trim();
                                // Extract product URL
                                product.url = element.getAttribute("href");
                                products.push(product);
                            }
                            return products;
                        })];
                case 5:
                    products = _a.sent();
                    // Log information about the first 10 products
                    console.log(products);
                    return [4 /*yield*/, browser.close()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
scrapeProducts();
