import { copy } from "../../config/content";
import { ArrowUpRight } from "lucide-react";
import { restaurant } from "../../data/restaurant";

export function DeliveryCallout({ cart = false }: { cart?: boolean }) {
  return (
    <aside className="delivery-callout" aria-label={copy.DeliveryCallout.regionLabel}>
      <div>
        <h2>{copy.DeliveryCallout.title}</h2>
        <p>
          {copy.DeliveryCallout.description}</p>
        {cart && (
          <p className="delivery-hint">
            {copy.DeliveryCallout.cartNotice}</p>
        )}
      </div>
      <a
        className="button ifood-button"
        href={restaurant.deliveryUrl}
        target="_blank"
        rel="noreferrer"
      >
        {copy.DeliveryCallout.orderAction}<ArrowUpRight size={18} />
      </a>
    </aside>
  );
}
