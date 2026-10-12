import {
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

export function Home() {
  const reducedMotion = useReducedMotion();
  return (
    <>
      <section className="nordeste-hero">
        <img
          className="nordeste-hero-photo"
          src="/images/cuscuz-ilustrativo.jpg"
          width="960"
          height="1200"
          fetchPriority="high"
          alt="Composição ilustrativa de cuscuz com carne seca e queijo coalho, criada por IA"
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
              CUSCUZERIA GOURMET <span aria-hidden="true">✳</span> SABOR
              NORDESTINO
            </div>
            <h1>
              O Nordeste
              <br />
              mora no
              <br />
              <em>nosso sabor.</em>
            </h1>
            <p>
              Cuscuz de milho, queijo coalho e carne seca.
              <br />
              Combinações que carregam a nossa cultura
              <br className="desktop-break" /> e dão vontade de chegar mais.
            </p>
            <div className="hero-buttons">
              <a className="button corn-button" href="#cardapio">
                Conhecer o cardápio <ArrowDown size={18} />
              </a>
              <a
                className="button outline-button"
                href={restaurant.deliveryUrl}
                target="_blank"
                rel="noreferrer"
              >
                Pedir no iFood <ArrowUpRight size={19} />
              </a>
            </div>
            <div className="hero-signature">
              <span className="signature-star" aria-hidden="true">
                ✳
              </span>
              <span>
                DA NOSSA CULTURA.
                <br />
                <b>PARA A SUA MESA.</b>
              </span>
            </div>
          </motion.div>
          <div className="hero-food-caption">
            <span>UM CLÁSSICO DO NORDESTE</span>
            <strong>Cuscuz, do nosso jeito.</strong>
            <small>Imagem ilustrativa criada por IA</small>
          </div>
        </div>
        <div className="cordel-edge" aria-hidden="true" />
      </section>
      <div className="flavor-ribbon" aria-label="Sabores do cardápio">
        <span>CUSCUZ DE MILHO</span>
        <i>✳</i>
        <span>QUEIJO COALHO</span>
        <i>✳</i>
        <span>CARNE SECA</span>
        <i>✳</i>
        <span>TAPIOCA</span>
        <i>✳</i>
        <span>UM DOCE FINAL</span>
      </div>
      <section className="nordeste-welcome">
        <div className="wrap welcome-grid">
          <div className="welcome-illustration">
            <SertaoArt />
            <span>ONDE TEM CUSCUZ, TEM NORDESTE.</span>
          </div>
          <div className="welcome-copy">
            <div className="eyebrow">CHEGUE MAIS, A MESA É SUA.</div>
            <h2>
              Tem raiz.
              <br />
              Tem história.
              <br />
              <em>Tem sabor nordestino.</em>
            </h2>
            <p>
              O milho é o começo. Queijo coalho, carne seca, calabresa e coco
              completam esse encontro de sabores. Na Cuscuzeria Gourmet, o
              cardápio vai do cuscuz tradicional às combinações recheadas e
              doces.
            </p>
            <a className="text-link" href="#cardapio">
              Encontre seu favorito <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <div className="menu-paper">
        <Catalog embedded />
      </div>
      <section className="nordeste-experience">
        <div className="wrap">
          <div className="eyebrow">PRA CADA VONTADE, UM SABOR.</div>
          <h2>
            Mais que cuscuz.
            <br />
            <em>Um cardápio pra descobrir.</em>
          </h2>
          <div className="experience-grid">
            <div>
              <Utensils size={30} />
              <h3>Do jeitinho que você gosta</h3>
              <p>
                Tradicional, com recheio ou doce. Explore as 14 combinações de
                cuscuz do cardápio.
              </p>
            </div>
            <div>
              <ShoppingBag size={30} />
              <h3>Do almoço ao lanche</h3>
              <p>
                Pratos executivos, tapiocas, lanches, porções e salgados para
                escolher.
              </p>
            </div>
            <div>
              <Heart size={30} />
              <h3>Deixe espaço para o doce</h3>
              <p>
                Romeu & Julieta, creme de avelã, pudim, bolo de pote e gelados.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="nordeste-delivery">
        <div className="wrap delivery-grid">
          <div>
            <div className="eyebrow">O NORDESTE TAMBÉM VAI ATÉ VOCÊ.</div>
            <h2>
              Bateu a vontade?
              <br />
              <em>É só pedir.</em>
            </h2>
            <p>
              Faça seu pedido de entrega pelo iFood.
              <br />
              Consulte por lá o cardápio disponível, o frete e o prazo.
            </p>
            <a
              className="button corn-button"
              href={restaurant.deliveryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Pedir no iFood <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="delivery-contact">
            <span className="contact-kicker">VAMOS CONVERSAR?</span>
            <h3>
              Uma dúvida antes
              <br />
              de escolher?
            </h3>
            <p>Fale diretamente com a Cuscuzeria Gourmet.</p>
            <a
              href={`https://wa.me/${restaurant.phone}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={21} /> (11) 99017-5768{" "}
              <ArrowUpRight size={17} />
            </a>
            <a
              className="instagram-contact"
              href={restaurant.instagram}
              target="_blank"
              rel="noreferrer"
            >
              @cuscuzgourmmet <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
