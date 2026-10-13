import { site, whatsappLink } from "../../config/site";
import { copy, formatText } from "../../config/content";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  ArrowUpRight,
  MessageCircle,
  Phone,
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
      <a className="skip-link" href={"#" + site.sections.mainId}>
        {copy.Layout.skipNavigation}</a>
      <div className="topline">
        {copy.Layout.toplineTagline}<span>{copy.Layout.toplineSymbol}</span> {copy.Layout.toplineDelivery}</div>
      <header>
        <div className="header-inner">
          <Link to={site.routes.home} aria-label={copy.Layout.homeLabel}>
            <Brand />
          </Link>
          <nav
            className={open ? "nav open" : "nav"}
            aria-label={copy.Layout.navigationLabel}
          >
            {site.navigation.map(({ id, label }) => (
              <NavLink key={id} to={site.routes[id as keyof typeof site.routes]} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="cart-icon"
              to={site.routes.cart}
              aria-label={formatText(copy.Layout.cartLabel, {value0: count})}
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
              {copy.Layout.deliveryAction}<ArrowUpRight size={16} />
            </a>
            <button
              className="mobile-toggle"
              aria-label={open ? copy.Layout.closeMenu : copy.Layout.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id={site.sections.mainId}>
        <Outlet />
      </main>
      <footer>
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              {copy.Layout.footerTaglineLineOne}<br />
              {copy.Layout.footerTaglineLineTwo}</p>
          </div>
          <div>
            <h3>{copy.Layout.exploreTitle}</h3>
            {site.navigation.filter(item => item.id !== "home").map(item => <Link key={item.id} to={site.routes[item.id as keyof typeof site.routes]}>{item.label}</Link>)}
          </div>
          <div>
            <h3>{copy.Layout.contactTitle}</h3>
            <div className="social-links">
              <a
                className="social-link whatsapp-link"
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} /> {copy.Layout.whatsappLabel}</a>
              <a
                className="social-link instagram-link"
                href={restaurant.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={17} /> {copy.Layout.instagramLabel}</a>
            </div>
            <a href={restaurant.deliveryUrl} target="_blank" rel="noreferrer">
              <ShoppingBag size={17} /> {copy.Layout.deliveryLabel}</a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="contact-whatsapp"
            >
              <MessageCircle size={17} /> {copy.Layout.phoneLabel}</a>
            <a href={restaurant.instagram} target="_blank" rel="noreferrer">
              <Instagram size={17} /> {copy.Layout.instagramHandle}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{copy.Layout.copyrightSymbol}{new Date().getFullYear()} {copy.Layout.copyrightName}</span>
          <span>{copy.Layout.demoNotice}</span>
        </div>
      </footer>
      {site.features.floatingWhatsapp && <a
        className="whatsapp-float"
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.Layout.floatingWhatsappLabel}
      >
        <span className="whatsapp-float-icon" aria-hidden="true">
          <MessageCircle className="whatsapp-bubble" />
          <Phone className="whatsapp-phone" />
        </span>
      </a>
      }
      {count > 0 && (
        <Link className="mobile-cart" to={site.routes.cart}>
          <ShoppingBag size={19} /> {copy.Layout.viewCart}<b>{count}</b>
        </Link>
      )}
    </>
  );
}
