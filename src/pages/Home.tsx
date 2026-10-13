import { site, whatsappLink } from "../config/site";
import { copy } from "../config/content";
﻿import {
  ArrowUpRight,
  ArrowDown,
  MessageCircle,
  Utensils,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { restaurant } from "../data/restaurant";
import { Catalog } from "./Catalog";
import { SertaoArt } from "../components/ui/SertaoArt";

import { CordelGallery } from "../components/ui/CordelGallery";

export function Home() {
  const reducedMotion = useReducedMotion();
  return (
    <>
      <section className="nordeste-hero">
        <img
          className="nordeste-hero-photo"
          src={site.branding.hero}
          width={site.branding.heroWidth}
          height={site.branding.heroHeight}
          fetchPriority="high"
          alt={copy.Home.heroImageAlt}
        />
        <div className="nordeste-hero-shade" />
        <div className="wrap nordeste-hero-inner">
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="eyebrow">
              {copy.Home.brandName}<span aria-hidden="true">{copy.Home.heroSymbol}</span> {copy.Home.tagline}</div>
            <h1>
              {copy.Home.titleLineOne}<br />
              {copy.Home.titleLineTwo}<br />
              <em>{copy.Home.titleAccent}</em>
            </h1>
            <p>
              {copy.Home.introLineOne}<br />
              {copy.Home.introLineTwo}<br className="desktop-break" /> {copy.Home.introLineThree}</p>
            <div className="hero-buttons">
              <a className="button corn-button" href={"#" + site.sections.menuId}>
                {copy.Home.menuAction}<ArrowDown size={18} />
              </a>
              <a
                className="button outline-button"
                href={restaurant.deliveryUrl}
                target="_blank"
                rel="noreferrer"
              >
                {copy.Home.deliveryAction}<ArrowUpRight size={19} />
              </a>
            </div>
            <div className="hero-signature">
              <span className="signature-star" aria-hidden="true">
                {copy.Home.signatureSymbol}</span>
              <span>
                {copy.Home.signatureLineOne}<br />
                <b>{copy.Home.signatureLineTwo}</b>
              </span>
            </div>
          </motion.div>
          <div className="hero-food-caption">
            <span>{copy.Home.photoEyebrow}</span>
            <strong>{copy.Home.photoTitle}</strong>
            <small>{copy.Home.photoDisclaimer}</small>
          </div>
        </div>
        <div className="cordel-edge" aria-hidden="true" />
      </section>
      <div className="flavor-ribbon" aria-label={copy.Home.ribbonLabel}>
        <span>{copy.Home.ribbonCorn}</span>
        <i>{copy.Home.ribbonSymbolOne}</i>
        <span>{copy.Home.ribbonCheese}</span>
        <i>{copy.Home.ribbonSymbolTwo}</i>
        <span>{copy.Home.ribbonMeat}</span>
        <i>{copy.Home.ribbonSymbolThree}</i>
        <span>{copy.Home.ribbonTapioca}</span>
        <i>{copy.Home.ribbonSymbolFour}</i>
        <span>{copy.Home.ribbonDessert}</span>
      </div>
      <section className="nordeste-welcome">
        <div className="wrap welcome-grid">
          <div className="welcome-illustration">
            <SertaoArt />
            <span>{copy.Home.illustrationCaption}</span>
          </div>
          <div className="welcome-copy">
            <div className="eyebrow">{copy.Home.welcomeEyebrow}</div>
            <h2>
              {copy.Home.welcomeTitleLineOne}<br />
              {copy.Home.welcomeTitleLineTwo}<br />
              <em>{copy.Home.welcomeTitleAccent}</em>
            </h2>
            <p>
              {copy.Home.welcomeDescription}</p>
            <a className="text-link" href={"#" + site.sections.menuId}>
              {copy.Home.favoritesAction}<ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <div className="menu-paper">
        <Catalog embedded />
      </div>
      {site.features.cordel && <CordelGallery />}
      <section className="nordeste-experience">
        <div className="wrap">
          <div className="eyebrow">{copy.Home.experienceEyebrow}</div>
          <h2>
            {copy.Home.experienceTitle}<br />
            <em>{copy.Home.experienceTitleAccent}</em>
          </h2>
          <div className="experience-grid">
            <div>
              <Utensils size={30} />
              <h3>{copy.Home.cuscuzTitle}</h3>
              <p>
                {copy.Home.cuscuzDescription}</p>
            </div>
            <div>
              <ShoppingBag size={30} />
              <h3>{copy.Home.lunchTitle}</h3>
              <p>
                {copy.Home.lunchDescription}</p>
            </div>
            <div>
              <Heart size={30} />
              <h3>{copy.Home.dessertTitle}</h3>
              <p>
                {copy.Home.dessertDescription}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="nordeste-delivery">
        <div className="wrap delivery-grid">
          <div>
            <div className="eyebrow">{copy.Home.deliveryEyebrow}</div>
            <h2>
              {copy.Home.deliveryTitle}<br />
              <em>{copy.Home.deliveryTitleAccent}</em>
            </h2>
            <p>
              {copy.Home.deliveryDescription}<br />
              {copy.Home.deliveryDetails}</p>
            <a
              className="button corn-button"
              href={restaurant.deliveryUrl}
              target="_blank"
              rel="noreferrer"
            >
              {copy.Home.deliveryButton}<ArrowUpRight size={20} />
            </a>
          </div>
          <div className="delivery-contact">
            <span className="contact-kicker">{copy.Home.contactEyebrow}</span>
            <h3>
              {copy.Home.contactTitleLineOne}<br />
              {copy.Home.contactTitleLineTwo}</h3>
            <p>{copy.Home.contactDescription}</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={21} /> {copy.Home.contactPhone}{" "}
              <ArrowUpRight size={17} />
            </a>
            <a
              className="instagram-contact"
              href={restaurant.instagram}
              target="_blank"
              rel="noreferrer"
            >
              {copy.Home.contactInstagram}<ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
