import { ArrowUpRight } from "lucide-react";
import { restaurant } from "../../data/restaurant";

export function DeliveryCallout({ cart = false }: { cart?: boolean }) {
  return (
    <aside className="delivery-callout" aria-label="Entrega pelo iFood">
      <div>
        <h2>Seu delivery é pelo iFood.</h2>
        <p>
          Escolha os itens e finalize seu pedido no iFood. Preços,
          disponibilidade, frete e prazo de entrega são informados por lá.
        </p>
        {cart && (
          <p className="delivery-hint">
            O carrinho deste site não é transferido automaticamente. Selecione
            seus itens novamente no iFood.
          </p>
        )}
      </div>
      <a
        className="button"
        href={restaurant.deliveryUrl}
        target="_blank"
        rel="noreferrer"
      >
        Pedir no iFood <ArrowUpRight size={18} />
      </a>
    </aside>
  );
}
