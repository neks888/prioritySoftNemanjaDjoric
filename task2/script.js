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
function scrapeProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, productLinks, _i, productLinks_1, productLink, productDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://www.etsy.com/c/jewelry/earrings/stud-earrings?explicit=1&ref=catcard-1214-508239208")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector("a.listing-link")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var productElements = document.querySelectorAll("a.listing-link");
                            var productLinks = [];
                            productElements.forEach(function (element) {
                                if (element.href) {
                                    productLinks.push(element.href);
                                }
                            });
                            return productLinks;
                        })];
                case 5:
                    productLinks = _a.sent();
                    _i = 0, productLinks_1 = productLinks;
                    _a.label = 6;
                case 6:
                    if (!(_i < productLinks_1.length)) return [3 /*break*/, 10];
                    productLink = productLinks_1[_i];
                    return [4 /*yield*/, page.goto(productLink)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a, _b, _c;
                            var details = {};
                            var nameElement = document.querySelector(".wt-text-caption.v2-listing-card__title");
                            var priceElement = document.querySelector(".lc-price");
                            var descriptionElement = document.querySelector(".wt-text-body-01.wt-break-word");
                            var sizeElements = document.querySelectorAll(".wt-text-body-01.wt-break-word");
                            var imageElement = document.querySelector(".wt-max-width-full.wt-horizontal-center.wt-vertical-center.carousel-image.wt-rounded");
                            details.name = ((_a = nameElement === null || nameElement === void 0 ? void 0 : nameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                            details.price = ((_b = priceElement === null || priceElement === void 0 ? void 0 : priceElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                            details.description = ((_c = descriptionElement === null || descriptionElement === void 0 ? void 0 : descriptionElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '';
                            details.sizes = Array.from(sizeElements).map(function (element) { return element.textContent.trim(); });
                            details.imageURL = imageElement === null || imageElement === void 0 ? void 0 : imageElement.getAttribute("src");
                            return details;
                        })];
                case 8:
                    productDetails = _a.sent();
                    console.log(productDetails);
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 6];
                case 10: return [4 /*yield*/, browser.close()];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
scrapeProducts();
