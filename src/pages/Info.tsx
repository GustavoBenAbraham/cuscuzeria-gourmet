import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, MessageCircle, Wheat } from "lucide-react";
import { restaurant } from "../data/restaurant";
import { DeliveryCallout } from "../components/ui/DeliveryCallout";
export function Story() {
  return (
    <section className="wrap section info">
      <div className="eyebrow">CULTURA À MESA</div>
      <h1>
        Nossas raízes.
        <br />
        <em>Nossos sabores.</em>
      </h1>
      <Wheat size={70} strokeWidth={1} />
      <p>
        O cardápio da Cuscuzeria Gourmet reúne o cuscuz de milho com
        ingredientes como queijo coalho, carne seca, calabresa e coco. A
        tradição também aparece nas tapiocas e nas combinações doces.
      </p>
      <p>
        A história do estabelecimento será apresentada aqui após a validação do
        proprietário. Este projeto demonstrativo preserva os ingredientes e
        produtos do cardápio oficial, sem atribuir uma trajetória ainda não
        confirmada à marca.
      </p>
      <Link to="/cardapio" className="button">
        Conhecer o cardápio <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
export function Contact() {
  return (
    <section className="wrap section info">
      <div className="eyebrow">A CONVERSA COMEÇA AQUI</div>
      <h1>
        Chegue mais.
        <br />
        <em>Vamos conversar?</em>
      </h1>
      <p>
        Confirme disponibilidade, formas de atendimento e detalhes do seu pedido
        diretamente com o restaurante.
      </p>
      <div className="contact-links">
        <DeliveryCallout />
        <a
          className="button"
          href={`https://wa.me/${restaurant.phone}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={20} /> (11) 99017-5768
        </a>
        <a
          className="text-link"
          href={restaurant.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={20} /> @cuscuzgourmmet <ArrowUpRight size={18} />
        </a>
        <a
          className="text-link"
          href={restaurant.menu}
          target="_blank"
          rel="noreferrer"
        >
          Ver cardápio original no Canva <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="notice">
        Entregas pelo iFood. Endereço, horários e atendimento para retirada
        aguardam confirmação do estabelecimento.
      </p>
    </section>
  );
}
