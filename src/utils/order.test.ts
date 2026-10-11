import { describe, it, expect } from "vitest";
import { products, categories } from "../data/catalog";
import { sanitizeCart, subtotal, whatsappUrl } from "./order";
describe("carrinho", () => {
  it("calcula quantidades e centavos sem arredondamento indevido", () => {
    const p = products.find((p) => p.name === "Picolé Cremoso")!;
    expect(
      subtotal([{ productId: p.id, quantity: 3, note: "" }], products),
    ).toBe(10.5);
    expect(subtotal([], products)).toBe(0);
  });
  it("descarta dados corrompidos, duplicatas e itens desconhecidos", () => {
    const id = products[0].id;
    expect(
      sanitizeCart(
        [
          { productId: id, quantity: 2, note: "a".repeat(400) },
          { productId: id, quantity: 3 },
          { productId: "x", quantity: 1 },
          { productId: products[1].id, quantity: -1 },
          { productId: products[2].id, quantity: 1.5 },
        ],
        products,
      ),
    ).toEqual([{ productId: id, quantity: 2, note: "a".repeat(300) }]);
    expect(sanitizeCart(null, products)).toEqual([]);
  });
  it("não calcula produtos indisponíveis ou pendentes", () => {
    const p = { ...products[0], available: false };
    expect(subtotal([{ productId: p.id, quantity: 2, note: "" }], [p])).toBe(0);
    expect(
      sanitizeCart(
        [{ productId: p.id, quantity: 2 }],
        [{ ...p, available: true, verificationStatus: "pending" }],
      ),
    ).toEqual([]);
  });
  it("rejeita quantidade acima do limite", () =>
    expect(
      sanitizeCart([{ productId: products[0].id, quantity: 100 }], products),
    ).toEqual([]));
});
describe("WhatsApp", () => {
  it("codifica nome, observações, subtotal e número oficial", () => {
    const url = whatsappUrl({
      name: "João & Maria",
      note: "Sem cebola\nObrigado!",
      items: [
        {
          name: "Cuscuz Carne Seca e Catupiry",
          quantity: 2,
          price: 35,
          note: "Sem vinagrete",
        },
      ],
    });
    expect(url).toMatch(/^https:\/\/wa.me\/5511990175768\?text=/);
    const message = decodeURIComponent(url.split("?text=")[1]);
    expect(message).toContain("2x Cuscuz Carne Seca e Catupiry");
    expect(message).toContain("70,00");
    expect(message).toContain("João & Maria");
    expect(message).toContain("Sem vinagrete");
    expect(message).toContain("A combinar");
    expect(message).toContain("confirmar a disponibilidade");
    expect(url).not.toContain("João");
  });
  it("rejeita pedido vazio e modalidade não confirmada", () => {
    expect(() => whatsappUrl({ name: "Ana", note: "", items: [] })).toThrow();
    expect(() =>
      whatsappUrl({
        name: "Ana",
        note: "",
        mode: "entrega",
        items: [{ name: "Cuscuz", quantity: 1, price: 14, note: "" }],
      }),
    ).toThrow();
  });
  it("rejeita preço e quantidade inválidos", () => {
    expect(() =>
      whatsappUrl({
        name: "Ana",
        note: "",
        items: [{ name: "Cuscuz", quantity: 0, price: 14, note: "" }],
      }),
    ).toThrow();
    expect(() =>
      whatsappUrl({
        name: "Ana",
        note: "",
        items: [{ name: "Cuscuz", quantity: 1, price: NaN, note: "" }],
      }),
    ).toThrow();
  });
});
describe("catálogo", () => {
  it("mantém origem e associação de preços conferidos nas páginas", () => {
    expect(products).toHaveLength(64);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(
      products.every(
        (p) =>
          p.source.page >= 1 &&
          p.source.page <= 4 &&
          categories.some((c) => c.id === p.categoryId),
      ),
    ).toBe(true);
    expect(products.find((p) => p.name === "X-salada")?.price).toBe(18);
    expect(
      products.find((p) => p.name === "Porção de Batata e Nuggets")?.price,
    ).toBe(50);
    expect(
      products.find((p) => p.name === "Cuscuz Carne Seca e Catupiry")?.price,
    ).toBe(35);
  });
});
