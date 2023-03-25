const puppeteer = require("puppeteer");

(async () => {
  let url = "https://github.com/BlinkDL/RWKV-LM"

  let productName = [];
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  let data = await page.evaluate(() => {
    productName = [
      ...document.querySelectorAll("a.product-title-link"),
    ].map((a) => ({ Product: { Title: a.innerText } }));

    return {
      productName,
    };
  });

  console.log(data);

  await browser.close();
})();