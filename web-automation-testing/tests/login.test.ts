import test, { chromium } from "@playwright/test";
const fs = require('fs')
test("Login test demo",async ()=>{
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
        // Load cookies from the file
    await page.goto("https://acrobat.adobe.com/link/home/appversion=latest");
    await page.waitForSelector('input[type="email"]')
    await page.fill('input[type="email"]',"dil18686@adobe.com")
    await page.click('button[data-id="EmailPage-ContinueButton"]')
    const cookies = await context.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));

})

test('Login again',async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // Load cookies from the file
    const cookies = JSON.parse(fs.readFileSync('cookies.json'));
    await context.addCookies(cookies);

    const page = await context.newPage();

    // Navigate to Yahoo homepage or mail after loading cookies
    await page.goto("https://acrobat.adobe.com/link/home/appversion=latest");

    // You should be logged in automatically
    await page.screenshot({ path: 'logged_in_acrobat.png' });

    await browser.close();
});