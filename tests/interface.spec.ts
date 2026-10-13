import { test, expect } from "@playwright/test";
import { restaurant } from "../src/data/restaurant";
test("home menu, original logo, and four reference pages", async ({page}) => {
  await page.goto('/');
  const logo = page.locator('header .original-logo');
  await expect(logo).toHaveAttribute('src', '/images/logo%20cuscuzeira%20gourmet.jpg');
  await expect(logo).toBeVisible();
  expect(await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.getByRole('link', {name:'Conhecer o cardápio', exact:true}).click();
  const menu = page.getByRole('region', {name:'Cardápio completo', exact:true});
  await expect(menu.getByRole('button', {name:'Cuscuzes salgados 11', exact:true})).toHaveAttribute('aria-pressed', 'true');
  await menu.getByRole('button', {name:'Todos 64', exact:true}).click();
  await expect(menu.locator('.product-card')).toHaveCount(64);
  await menu.getByRole('button', {name:'Tapiocas 9', exact:true}).click();
  await expect(menu.locator('.product-card')).toHaveCount(9);
  await page.locator('.original-menu summary').click();
  await expect(page.locator('.original-menu-grid img')).toHaveCount(4);
  await expect(page.getByRole('link', {name:'Abrir página 1: Cuscuzes salgados e doces'})).toBeVisible();
});
test("layout without overflow on mobile, tablet, and desktop", async ({ page }) => {
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.goto("/cardapio");
    await expect(page.getByText("64 opções para descobrir")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "docs/preview-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.screenshot({ path: "docs/preview-mobile.png", fullPage: true });
});
test("search, cart persistence, validation, and WhatsApp inquiry", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/cardapio");
  await page
    .getByRole("textbox", { name: "Pesquisar produtos" })
    .fill("carne seca e catupiry");
  await expect(page.getByText("3 opções para descobrir")).toBeVisible();
  await page
    .getByRole("button", {
      name: "Adicionar Cuscuz Carne Seca e Catupiry",
      exact: true,
    })
    .click();
  await page.goto("/pedido");
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "Pedir no iFood", exact: true }),
  ).toHaveAttribute("href", restaurant.deliveryUrl);
  await expect(
    page.getByText("O carrinho deste site não é transferido automaticamente.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.getByLabel("Endereço", { exact: true })).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Cuscuz Carne Seca e Catupiry" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Aumentar Cuscuz Carne Seca e Catupiry" })
    .click();
  await page.getByLabel("Observações deste item").fill("Sem cebola");
  await page.reload();
  await expect(page.getByLabel("Observações deste item")).toHaveValue(
    "Sem cebola",
  );
  await expect(
    page.getByText("R$ 70,00", { exact: true }).first(),
  ).toBeVisible();
  await page.getByRole("button", { name: "Consultar pelo WhatsApp" }).click();
  await expect(
    page.getByText("Informe seu nome (pelo menos 2 caracteres)."),
  ).toBeVisible();
  await page.getByLabel("Seu nome").fill("João & Maria");
  await page.getByLabel("Observações gerais").fill("Obrigado!");
  await page.getByRole("button", { name: "Consultar pelo WhatsApp" }).click();
  const url = await page
    .getByRole("link", { name: "Abrir WhatsApp", exact: true })
    .getAttribute("href");
  expect(url).toContain("https://wa.me/5511990175768?text=");
  expect(decodeURIComponent(url!)).toContain("2x Cuscuz Carne Seca e Catupiry");
  expect(decodeURIComponent(url!)).toContain("Sem cebola");
  expect(decodeURIComponent(url!)).toContain("Entregas pelo iFood");
  await page
    .getByRole("button", {
      name: "Remover Cuscuz Carne Seca e Catupiry",
      exact: true,
    })
    .click();
  await expect(page.getByText("Sua mesa ainda está vazia.")).toBeVisible();
  expect(errors).toEqual([]);
});
test("mobile navigation and empty search results", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Cardápio", exact: true })
    .click();
  await expect(page).toHaveURL(/cardapio/);
  await page
    .getByRole("textbox", { name: "Pesquisar produtos" })
    .fill("xyzxyz");
  await expect(
    page.getByRole("heading", { name: "Nenhum sabor encontrado." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.getByText("64 opções para descobrir")).toBeVisible();
});


test("configured routes, metadata, theme, and cordel are rendered", async ({page}) => {
 const { site } = await import('../src/config/site');
 const { theme } = await import('../src/config/theme');
 const { default: poems } = await import('../src/config/cordel.json', { with: { type: 'json' } });
 const errors: string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const entry of site.navigation){
  await page.goto(site.routes[entry.id]);
  await expect(page).toHaveTitle(entry.title+' | '+site.restaurant.name);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang',site.locale);
 }
 await page.goto(site.routes.home);
 const structuredData=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}');
 expect(structuredData.name).toBe(site.restaurant.name);
 expect(structuredData.telephone).toBe('+'+site.restaurant.phone);
 await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href',site.branding.favicon);
 await expect(page.locator('.cordel-booklet')).toHaveCount(site.features.cordel ? poems.length : 0);
 if(site.features.cordel) for(const poem of poems) {
  const artwork=page.getByRole('img',{name:poem.image.alt,exact:true});
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute('src',poem.image.src);
  await expect.poll(()=>artwork.evaluate((img: HTMLImageElement)=>img.complete && img.naturalWidth>0)).toBe(true);
  await expect(artwork).toHaveCSS('object-fit','contain');
 }
 const button=page.locator('.header-actions .ifood-button');
 await button.hover();
 const hex=theme.colors.ifoodRed.slice(1);
 const rgb='rgb('+[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)).join(', ')+')';
 await expect(button).toHaveCSS('background-color',rgb);
 await expect(button).toHaveCSS('color','rgb(255, 255, 255)');
 expect(errors).toEqual([]);
});

test("configured cart limit disables increments and clearing persists", async ({page}) => {
 const { site }=await import('../src/config/site');
 const { products }=await import('../src/data/catalog');
 const product=products.find(p=>p.available && p.price!==null)!;
 await page.addInitScript(({key,id,quantity})=>localStorage.setItem(key,JSON.stringify([{productId:id,quantity,note:''}])),{key:site.cart.storageKey,id:product.id,quantity:site.cart.maxQuantity});
 await page.goto(site.routes.cart);
 await expect(page.locator('.cart-row .stepper button').last()).toBeDisabled();
 await expect(page.locator('.item-note input')).toHaveAttribute('maxlength',String(site.cart.itemNoteMaxLength));
 await page.locator('.cart-toolbar button').click();
 await expect(page.locator('.cart-items')).toHaveCount(0);
 await expect.poll(()=>page.evaluate(key=>localStorage.getItem(key),site.cart.storageKey)).toBe('[]');
});

test("storage failure keeps the in-memory cart usable and explains the limitation", async ({page}) => {
 const { site }=await import('../src/config/site');
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Storage blocked','SecurityError');};});
 await page.goto(site.routes.menu);
 await page.locator('.product-card .add').first().click();
 await page.locator('header .cart-icon').click();
 await expect(page.locator('.cart-row')).toHaveCount(1);
 await expect(page.locator('.checkout-grid [role="alert"]')).toBeVisible();
 await page.locator('.cart-row .stepper button').last().click();
 await expect(page.locator('.cart-row .stepper span')).toHaveText('2');
});
