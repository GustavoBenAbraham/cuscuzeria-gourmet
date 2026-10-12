import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { restaurant } from "../../data/restaurant";
import { BrandArtwork } from "../ui/BrandArtwork";
export function Brand() {
  return (
    <span className="brand">
      <BrandArtwork />
    </span>
  );
}
export function Layout() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="topline">
        SABOR NORDESTINO <span>✳</span> DELIVERY PELO IFOOD
      </div>
      <header>
        <div className="header-inner">
          <Link to="/" aria-label="Cuscuzeria Gourmet início">
            <Brand />
          </Link>
          <nav
            className={open ? "nav open" : "nav"}
            aria-label="Navegação principal"
          >
            {[
              ["/", "Início"],
              ["/cardapio", "Cardápio"],
              ["/nossa-historia", "Nossa história"],
              ["/contato", "Contato"],
            ].map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="cart-icon"
              to="/pedido"
              aria-label={`Carrinho com ${count} itens`}
            >
              <ShoppingBag size={22} />
              <span>{count}</span>
            </Link>
            <a
              className="button small desktop ifood-button"
              href={restaurant.deliveryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Pedir no iFood <ArrowUpRight size={16} />
            </a>
            <button
              className="mobile-toggle"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="conteudo">
        <Outlet />
      </main>
      <footer>
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              Um pedacinho do Nordeste
              <br />
              em cada sabor.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link to="/cardapio">Cardápio</Link>
            <Link to="/nossa-historia">Nossa história</Link>
            <Link to="/contato">Contato</Link>
          </div>
          <div>
            <h3>Vamos conversar?</h3>
            <div className="social-links">
              <a
                className="social-link whatsapp-link"
                href={`https://wa.me/${restaurant.phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
              <a
                className="social-link instagram-link"
                href={restaurant.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={17} /> Instagram
              </a>
            </div>
            <a href={restaurant.deliveryUrl} target="_blank" rel="noreferrer">
              <ShoppingBag size={17} /> Delivery pelo iFood
            </a>
            <a
              href={`https://wa.me/${restaurant.phone}`}
              target="_blank"
              rel="noreferrer"
              className="contact-whatsapp"
            >
              <MessageCircle size={17} /> (11) 99017-5768
            </a>
            <a href={restaurant.instagram} target="_blank" rel="noreferrer">
              <Instagram size={17} /> @cuscuzgourmmet
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cuscuzeria Gourmet.</span>
          <span>Projeto demonstrativo · disponibilidade a confirmar</span>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${restaurant.phone}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar pelo WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      {count > 0 && (
        <Link className="mobile-cart" to="/pedido">
          <ShoppingBag size={19} /> Visualizar pedido <b>{count}</b>
        </Link>
      )}
    </>
  );
}
