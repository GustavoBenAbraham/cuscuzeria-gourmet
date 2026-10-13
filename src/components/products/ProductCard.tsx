import { site } from "../../config/site";
import { copy, formatText } from "../../config/content";
import { Plus, Minus } from "lucide-react";
import type { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import { money } from "../../utils/order";
import { FoodArt } from "../ui/FoodArt";
import { CategoryArt } from "../ui/CategoryArt";
export function ProductCard({
  product: p,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const Heading = compact ? "h4" : "h3";
  const cart = useCart();
  const n = cart.items.find((i) => i.productId === p.id)?.quantity || 0;
  return (
    <article className={`product-card${compact ? " menu-product" : ""}`}>
      {(!compact || p.image) && (
        <div className="product-art">
          {p.image ? (
            <img src={p.image} alt={p.name} loading="lazy" />
          ) : p.categoryId.includes("cuscuz") ? (
            <FoodArt variant={p.categoryId} />
          ) : (
            <CategoryArt category={p.categoryId} />
          )}
          {!p.image && <span>{copy.ProductCard.illustrationLabel}</span>}
          {p.featured && !compact && <b>{copy.ProductCard.featuredLabel}</b>}
        </div>
      )}
      <div className="product-body">
        <Heading>{p.name}</Heading>
        <p>{p.description}</p>
        <div className="product-bottom">
          <strong>{p.price === null ? copy.ProductCard.unconfirmedPrice : money(p.price)}</strong>
          {!p.available ||
          p.price === null ||
          p.verificationStatus !== "verified" ? (
            <span>{copy.ProductCard.unavailableLabel}</span>
          ) : n ? (
            <div className="stepper">
              <button
                aria-label={formatText(copy.ProductCard.decreaseLabel, {value0: p.name})}
                onClick={() => cart.quantity(p.id, n - 1)}
              >
                <Minus size={16} />
              </button>
              <span aria-live="polite">{n}</span>
              <button
                aria-label={formatText(copy.ProductCard.increaseLabel, {value0: p.name})}
                disabled={n >= site.cart.maxQuantity}
                onClick={() => cart.quantity(p.id, n + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              className="add"
              aria-label={formatText(copy.ProductCard.addProductLabel, {value0: p.name})}
              onClick={() => cart.quantity(p.id, 1)}
            >
              <Plus size={18} /> {copy.ProductCard.addLabel}</button>
          )}
        </div>
      </div>
    </article>
  );
}
