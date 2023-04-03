require('dotenv/config')
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://gdlp.com.br/');
    await page.waitForSelector('[class="skip-link skip-account"]');
    await page.click('[class="skip-link skip-account"]')

    await page.waitForSelector('[id="header-account"]');
    await page.click('[href="https://gdlp.com.br/customer/account/login/referer/aHR0cHM6Ly9nZGxwLmNvbS5ici8,/"]');

    await page.waitForSelector('[name="login[username]"]' && '[name="login[password]"]');
    await page.type('[name="login[username]"]', `${process.env.GDLP_EMAIL}`);
    await page.type('[name="login[password]"]', `${process.env.GDLP_PASS}`);

    await page.waitForSelector('[name="send"]');
    await page.evaluate(() => {
        const button = document.querySelector('[name="send"]');
        button.addEventListener('click', () => { });
        button.click();
    });

    const url = await page.evaluate(() => {
        return prompt('Insira a URL desejada: ')
    })
    await page.goto(url, { waitUntil: 'networkidle0' })

    await page.waitForSelector('[id="configurable_swatch_magework_numeracao"]')
    await page.evaluate(() => {
        const button = document.querySelector(`[name="${process.env.SIZE}"]`);
        button.addEventListener('click', () => { });
        button.click();
    });

    await page.waitForSelector('[class="add-to-cart-buttons"]')
    await page.evaluate(() => {
        const button = document.querySelector('[title="Comprar"]');
        button.addEventListener('click', () => { });
        button.click();
    });

    await page.waitForSelector('[class="checkout-types top"]')
    await page.evaluate(() => {
        const button = document.querySelector('[title="Finalizar Pedido"]');
        button.addEventListener('click', () => { });
        button.click();
    });

    await page.waitForSelector('[class="sedex---em-média-3-dia(s)"]')
    await page.evaluate(() => {
        const button = document.querySelector('[name="shipping_method"]')
        button.addEventListener('click', () => { });
        button.click();
    })

    setTimeout(() => {
        page.waitForSelector('[class="order-review-button"]')
        page.evaluate(() => {
            const button = document.querySelector('[title="Finalizar Pedido"]');
            button.addEventListener('click', () => { });
            button.click()
        });

    }, 1500);

})();