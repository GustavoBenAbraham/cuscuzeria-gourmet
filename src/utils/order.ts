import type { CartItem, Order, Product } from "../types";
import { restaurant } from "../data/restaurant";
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export function subtotal(items: CartItem[], products: Product[]) {
  return (
    items.reduce((sum, item) => {
      const p = products.find((p) => p.id === item.productId);
      return (
        sum +
        (p?.available &&
        p.verificationStatus === "verified" &&
        p.price !== null &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
          ? Math.round(p.price * 100) * item.quantity
          : 0)
      );
    }, 0) / 100
  );
}
export function sanitizeCart(raw: unknown, products: Product[]): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  return raw.flatMap((i) => {
    if (
      !i ||
      typeof i !== "object" ||
      typeof i.productId !== "string" ||
      seen.has(i.productId) ||
      !Number.isInteger(i.quantity) ||
      i.quantity < 1 ||
      i.quantity > 99 ||
      !products.some(
        (p) =>
          p.id === i.productId &&
          p.available &&
          p.verificationStatus === "verified" &&
          p.price !== null,
      )
    )
      return [];
    seen.add(i.productId);
    return [
      {
        productId: i.productId,
        quantity: i.quantity,
        note: typeof i.note === "string" ? i.note.slice(0, 300) : "",
      },
    ];
  });
}
export function whatsappUrl(order: Order) {
  if (
    !order.name.trim() ||
    !order.items.length ||
    order.items.some(
      (i) =>
        !Number.isInteger(i.quantity) ||
        i.quantity < 1 ||
        i.quantity > 99 ||
        !Number.isFinite(i.price) ||
        i.price < 0,
    )
  )
    throw new Error("Pedido inválido");
  if (order.mode && !restaurant.confirmedOrderModes.includes(order.mode))
    throw new Error("Modalidade não confirmada");
  const total =
    order.items.reduce(
      (s, i) => s + Math.round(i.price * 100) * i.quantity,
      0,
    ) / 100;
  const message = [
    `Olá! Gostaria de consultar estes itens do cardápio da ${restaurant.name}.`,
    "",
    "MINHA SELEÇÃO",
    ...order.items.map(
      (i) =>
        `${i.quantity}x ${i.name} — ${money(i.price * i.quantity)}${i.note ? `\n  Observação: ${i.note}` : ""}`,
    ),
    "",
    `Observações: ${order.note || "Nenhuma"}`,
    `Subtotal de referência do cardápio: ${money(total)}`,
    `Nome: ${order.name}`,
    `Atendimento: ${order.mode || "Consulta pelo WhatsApp. Entregas pelo iFood."}`,
    ...(order.mode === "entrega" ? [`Endereço: ${order.address || ""}`] : []),
    "",
    "Poderiam confirmar a disponibilidade e esclarecer minhas observações?",
  ].join("\n");
  return `https://wa.me/${restaurant.phone}?text=${encodeURIComponent(message)}`;
}
