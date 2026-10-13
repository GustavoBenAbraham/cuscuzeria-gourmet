import { site } from "../config/site";
import { copy, formatText } from "../config/content";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../hooks/useCart";
import { products } from "../data/catalog";
import { restaurant } from "../data/restaurant";
import { money, whatsappUrl } from "../utils/order";
import { DeliveryCallout } from "../components/ui/DeliveryCallout";
const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(site.cart.nameMinLength, copy.Cart.nameTooShort)
      .max(site.cart.nameMaxLength, copy.Cart.nameTooLong),
    note: z.string().max(site.cart.orderNoteMaxLength, copy.Cart.noteTooLong),
    mode: z.enum(["", "retirada", "entrega"]),
    address: z.string().max(site.cart.addressMaxLength, copy.Cart.addressTooLong),
  })
  .superRefine((d, ctx) => {
    if (d.mode && !restaurant.confirmedOrderModes.includes(d.mode))
      ctx.addIssue({
        code: "custom",
        path: ["mode"],
        message: copy.Cart.modeUnconfirmed,
      });
    if (d.mode === "entrega" && d.address.trim().length < site.cart.addressMinLength)
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: copy.Cart.addressRequired,
      });
  });
type Fields = z.infer<typeof schema>;
export function Cart() {
  const cart = useCart();
  const [url, setUrl] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", note: "", mode: "", address: "" },
  });
  function submit(data: Fields) {
    setUrl(
      whatsappUrl({
        name: data.name,
        note: data.note,
        mode: data.mode || undefined,
        address: data.address,
        items: cart.items.map((i) => {
          const p = products.find((p) => p.id === i.productId)!;
          return {
            name: p.name,
            quantity: i.quantity,
            price: p.price!,
            note: i.note,
          };
        }),
      }),
    );
  }
  return (
    <section className="wrap section">
      <div className="eyebrow">{copy.Cart.eyebrow}</div>
      <h1>
        {copy.Cart.title}<em>{copy.Cart.titleAccent}</em>
      </h1>
      <DeliveryCallout cart={cart.items.length > 0} />
      {!cart.items.length ? (
        <div className="empty">
          <ShoppingBag size={45} />
          <h2>{copy.Cart.emptyTitle}</h2>
          <p>{copy.Cart.emptyDescription}</p>
          <Link to={site.routes.menu} className="button">
            {copy.Cart.browseMenu}<ArrowUpRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <div>
            {cart.storageError && (
              <p role="alert" className="notice">
                {copy.Cart.storageError}</p>
            )}
            <div className="cart-toolbar">
              <span>{copy.Cart.summary}</span>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  cart.clear();
                  setUrl("");
                }}
              >
                {copy.Cart.clearCart}</button>
            </div>
            <div className="cart-items">
              {cart.items.map((i) => {
                const p = products.find((p) => p.id === i.productId)!;
                return (
                  <article className="cart-row" key={i.productId}>
                    <div className="cart-row-title">
                      <div>
                        <h2>{p.name}</h2>
                        <span>{money(p.price!)} {copy.Cart.perUnit}</span>
                      </div>
                      <button
                        aria-label={formatText(copy.Cart.removeItem, {value0: p.name})}
                        onClick={() => {
                          cart.quantity(p.id, 0);
                          setUrl("");
                        }}
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                    <div className="cart-row-bottom">
                      <div className="stepper">
                        <button
                          aria-label={formatText(copy.Cart.decreaseItem, {value0: p.name})}
                          onClick={() => {
                            cart.quantity(p.id, i.quantity - 1);
                            setUrl("");
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <span>{i.quantity}</span>
                        <button
                          disabled={i.quantity >= site.cart.maxQuantity}
                          aria-label={formatText(copy.Cart.increaseItem, {value0: p.name})}
                          onClick={() => {
                            cart.quantity(p.id, i.quantity + 1);
                            setUrl("");
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <strong>{money(i.quantity * p.price!)}</strong>
                    </div>
                    <label className="item-note">
                      {copy.Cart.itemNote}<input
                        maxLength={site.cart.itemNoteMaxLength}
                        value={i.note}
                        placeholder={copy.Cart.itemNotePlaceholder}
                        onChange={(e) => {
                          cart.note(p.id, e.target.value);
                          setUrl("");
                        }}
                      />
                    </label>
                  </article>
                );
              })}
            </div>
            <Link className="text-link" to={site.routes.menu}>
              {copy.Cart.continueShopping}<ArrowUpRight size={17} />
            </Link>
          </div>
          <form
            className="order-form"
            onSubmit={handleSubmit(submit)}
            onChange={() => setUrl("")}
          >
            <h2>{copy.Cart.inquiryTitle}</h2>
            <div className="subtotal">
              <span>{copy.Cart.subtotalLabel}{cart.count} {copy.Cart.itemCountSuffix}</span>
              <strong>{money(cart.total)}</strong>
            </div>
            <p className="form-hint">
              {copy.Cart.priceNotice}</p>
            <label>
              {copy.Cart.nameLabel}<input
                autoComplete="given-name"
                {...register("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </label>
            {errors.name && (
              <p id="name-error" role="alert" className="field-error">
                {errors.name.message}
              </p>
            )}
            {restaurant.confirmedOrderModes.length > 0 ? (
              <>
                <label>
                  {copy.Cart.modeLabel}<select {...register("mode")}>
                    <option value="">{copy.Cart.arrangeMode}</option>
                    {restaurant.confirmedOrderModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode === "entrega" ? copy.Cart.deliveryMode : copy.Cart.pickupMode}
                      </option>
                    ))}
                  </select>
                </label>
                {watch("mode") === "entrega" && (
                  <label>
                    {copy.Cart.addressLabel}<input
                      autoComplete="street-address"
                      {...register("address")}
                    />
                  </label>
                )}
              </>
            ) : (
              <p className="notice">
                {copy.Cart.deliveryNotice}</p>
            )}
            {errors.mode && (
              <p className="field-error" role="alert">
                {errors.mode.message}
              </p>
            )}
            {errors.address && (
              <p className="field-error" role="alert">
                {errors.address.message}
              </p>
            )}
            <label>
              {copy.Cart.orderNoteLabel}<textarea
                rows={3}
                maxLength={site.cart.orderNoteMaxLength}
                {...register("note")}
                placeholder={copy.Cart.orderNotePlaceholder}
              />
            </label>
            {errors.note && (
              <p role="alert" className="field-error">
                {errors.note.message}
              </p>
            )}
            <button type="submit" className="button">
              {copy.Cart.prepareInquiry}<ArrowUpRight size={18} />
            </button>
            {url && (
              <div className="ready" role="status">
                <p>
                  {copy.Cart.readyMessage}</p>
                <a
                  className="button"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.Cart.openWhatsapp}<ArrowUpRight size={18} />
                </a>
              </div>
            )}
            <p className="form-hint">
              {copy.Cart.privacyNotice}</p>
          </form>
        </div>
      )}
    </section>
  );
}
