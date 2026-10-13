import { copy, formatText } from "../config/content";
import { site, whatsappLink } from "../config/site";
import type { CartItem, Order, Product } from "../types";
import { restaurant } from "../data/restaurant";
export const money = (value: number) =>
  new Intl.NumberFormat(site.locale, { style: "currency", currency: site.currency }).format(
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
      i.quantity > site.cart.maxQuantity ||
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
        note: typeof i.note === "string" ? i.note.slice(0, site.cart.itemNoteMaxLength) : "",
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
        i.quantity > site.cart.maxQuantity ||
        !Number.isFinite(i.price) ||
        i.price < 0,
    )
  )
    throw new Error(copy.order.invalidOrder);
  if (order.mode && !restaurant.confirmedOrderModes.includes(order.mode))
    throw new Error(copy.order.unconfirmedMode);
  const total =
    order.items.reduce(
      (s, i) => s + Math.round(i.price * 100) * i.quantity,
      0,
    ) / 100;
  const message = [
    formatText(copy.order.greeting, {value0: restaurant.name}),
    "",
    copy.order.selectionTitle,
    ...order.items.map(
      (i) =>
        `${i.quantity}x ${i.name} — ${money(i.price * i.quantity)}${i.note ? "\n  " + formatText(copy.order.itemNote, {note: i.note}) : ""}`,
    ),
    "",
    formatText(copy.order.notes, {value0: order.note || copy.order.noNotes}),
    formatText(copy.order.subtotal, {value0: money(total)}),
    formatText(copy.order.customerName, {value0: order.name}),
    formatText(copy.order.fulfillment, {value0: order.mode || copy.order.defaultFulfillment}),
    ...(order.mode === "entrega" ? [formatText(copy.order.address, {value0: order.address || ""})] : []),
    "",
    copy.order.closing,
  ].join("\n");
  return `${whatsappLink()}?text=${encodeURIComponent(message)}`;
}
