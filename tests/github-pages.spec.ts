import { test, expect } from '@playwright/test';
const base='/cuscuzeria-gourmet-site';
test('project-path assets and direct routes work without SPA server rewrites',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/', '/cardapio/', '/nossa-historia/', '/contato/', '/pedido/']){
  const response=await page.goto(base+route);
  expect(response?.status()).toBe(200);
  await expect(page.locator('main h1')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('header .original-logo')).toHaveAttribute('src',base+'/images/logo%20cuscuzeira%20gourmet.jpg');
  expect(await page.locator('header .original-logo').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
 }
 await page.goto(base+'/');
 for(const image of await page.locator('.cordel-print img').all()){
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  expect(await image.getAttribute('src')).toContain(base+'/images/');
 }
 await expect(page.locator('link[type="image/svg+xml"]')).toHaveAttribute('href',base+'/favicon.svg?v=logo-original');
 await page.locator('.hero-buttons a').first().click();
 await expect(page).toHaveURL(new RegExp(base+'/#cardapio$'));
 await page.locator('.original-menu summary').click();
 for(const link of await page.locator('.original-menu-grid a').all())expect(await link.getAttribute('href')).toContain(base+'/images/');
 expect(errors).toEqual([]);
});
test('mobile navigation and cart stay inside the project path',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/');
 await page.locator('.mobile-toggle').click();
 await page.locator('nav a').nth(1).click();
 await expect(page).toHaveURL(base+'/cardapio');
 await page.locator('.product-card .add').first().click();
 await page.locator('header .cart-icon').click();
 await expect(page).toHaveURL(base+'/pedido');
 await expect(page.locator('.cart-row')).toHaveCount(1);
 await page.reload();
 await expect(page.locator('.cart-row')).toHaveCount(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
