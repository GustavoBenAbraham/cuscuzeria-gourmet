import { site, whatsappLink } from "../config/site";
import { copy } from "../config/content";
import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, MessageCircle, Wheat } from "lucide-react";
import { restaurant } from "../data/restaurant";
import { DeliveryCallout } from "../components/ui/DeliveryCallout";
export function Story() {
  return (
    <section className="wrap section info">
      <div className="eyebrow">{copy.Info.storyEyebrow}</div>
      <h1>
        {copy.Info.storyTitle}<br />
        <em>{copy.Info.storyTitleAccent}</em>
      </h1>
      <Wheat size={70} strokeWidth={1} />
      <p>
        {copy.Info.storyDescription}</p>
      <p>
        {copy.Info.storyNotice}</p>
      <Link to={site.routes.menu} className="button">
        {copy.Info.menuAction}<ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
export function Contact() {
  return (
    <section className="wrap section info">
      <div className="eyebrow">{copy.Info.contactEyebrow}</div>
      <h1>
        {copy.Info.contactTitle}<br />
        <em>{copy.Info.contactTitleAccent}</em>
      </h1>
      <p>
        {copy.Info.contactDescription}</p>
      <div className="contact-links">
        <DeliveryCallout />
        <a
          className="button"
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={20} /> {copy.Info.contactPhone}</a>
        <a
          className="text-link"
          href={restaurant.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={20} /> {copy.Info.contactInstagram}<ArrowUpRight size={18} />
        </a>
        <a
          className="text-link"
          href={restaurant.menu}
          target="_blank"
          rel="noreferrer"
        >
          {copy.Info.originalMenuAction}<ArrowUpRight size={18} />
        </a>
      </div>
      <p className="notice">
        {copy.Info.contactNotice}</p>
    </section>
  );
}
