import { Plus, Minus } from "lucide-react";
import type { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import { money } from "../../utils/order";
import { FoodArt } from "../ui/FoodArt";
import { CategoryArt } from "../ui/CategoryArt";
export function ProductCard({ product: p }: { product: Product }) {
  const cart = useCart();
  const n = cart.items.find((i) => i.productId === p.id)?.quantity || 0;
  return (
    <article className="product-card">
      <div className="product-art">
        {p.image ? (
          <img src={p.image} alt={p.name} loading="lazy" />
        ) : p.categoryId.includes("cuscuz") ? (
          <FoodArt variant={p.categoryId} />
        ) : (
          <CategoryArt category={p.categoryId} />
        )}
        <span>Ilustração</span>
        {p.featured && <b>Seleção da casa</b>}
      </div>
      <div className="product-body">
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <div className="product-bottom">
          <strong>{p.price === null ? "A confirmar" : money(p.price)}</strong>
          {!p.available ||
          p.price === null ||
          p.verificationStatus !== "verified" ? (
            <span>Indisponível</span>
          ) : n ? (
            <div className="stepper">
              <button
                aria-label={`Remover uma unidade de ${p.name}`}
                onClick={() => cart.quantity(p.id, n - 1)}
              >
                <Minus size={16} />
              </button>
              <span aria-live="polite">{n}</span>
              <button
                aria-label={`Adicionar uma unidade de ${p.name}`}
                disabled={n >= 99}
                onClick={() => cart.quantity(p.id, n + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              className="add"
              aria-label={`Adicionar ${p.name}`}
              onClick={() => cart.quantity(p.id, 1)}
            >
              <Plus size={18} /> Adicionar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
