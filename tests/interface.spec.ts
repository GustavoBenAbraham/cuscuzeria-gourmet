import { test, expect } from "@playwright/test";
test("layout sem overflow em mobile, tablet e desktop", async ({ page }) => {
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
test("busca, carrinho persistido, validação e checkout WhatsApp", async ({
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
  await page
    .getByRole("button", { name: "Preparar pedido para WhatsApp" })
    .click();
  await expect(
    page.getByText("Informe seu nome (pelo menos 2 caracteres)."),
  ).toBeVisible();
  await page.getByLabel("Seu nome").fill("João & Maria");
  await page.getByLabel("Observações gerais").fill("Obrigado!");
  await page
    .getByRole("button", { name: "Preparar pedido para WhatsApp" })
    .click();
  const url = await page
    .getByRole("link", { name: "Abrir WhatsApp", exact: true })
    .getAttribute("href");
  expect(url).toContain("https://wa.me/5511990175768?text=");
  expect(decodeURIComponent(url!)).toContain("2x Cuscuz Carne Seca e Catupiry");
  expect(decodeURIComponent(url!)).toContain("Sem cebola");
  expect(decodeURIComponent(url!)).toContain("A combinar");
  await page
    .getByRole("button", {
      name: "Remover Cuscuz Carne Seca e Catupiry",
      exact: true,
    })
    .click();
  await expect(page.getByText("Sua mesa ainda está vazia.")).toBeVisible();
  expect(errors).toEqual([]);
});
test("menu mobile e busca sem resultados", async ({ page }) => {
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
