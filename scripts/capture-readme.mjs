import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
fs.mkdirSync('docs/screenshots', {recursive: true});
async function capture(route, file) {
  await page.goto('http://127.0.0.1:5190' + route, {waitUntil:'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path:'docs/screenshots/'+file});
}
await capture('/', 'home-desktop.png');
await capture('/cardapio', 'menu-desktop.png');
await page.setViewportSize({width:390,height:844});
await capture('/', 'home-mobile.png');
await page.goto('http://127.0.0.1:5190/cardapio', {waitUntil:'networkidle'});
await page.getByRole('button', {name:'Adicionar Cuscuz Carne Seca e Catupiry',exact:true}).click();
await capture('/pedido', 'cart-mobile.png');
await browser.close();
