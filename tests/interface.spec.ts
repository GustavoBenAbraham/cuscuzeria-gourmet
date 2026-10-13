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
