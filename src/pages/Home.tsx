import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Wheat, Heart, Utensils } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { products } from "../data/catalog";
import { ProductCard } from "../components/products/ProductCard";

export function Home() {
  const reducedMotion = useReducedMotion();
  return (
    <>
      <section className="hero wrap">
        <motion.div
          className="hero-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow">
            <span /> TRADIÇÃO QUE TEM SABOR
          </div>
          <h1>
            Um pedacinho
            <br />
            do <em>Nordeste</em>
            <br />
            em cada sabor.
          </h1>
          <p>
            Cuscuz, queijo coalho, carne seca…
            <br />
            Encontre os sabores da culinária nordestina em um cardápio feito
            para explorar.
          </p>
          <div className="hero-buttons">
            <Link className="button" to="/cardapio">
              Explorar cardápio <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" to="/pedido">
              Fazer meu pedido <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-caption">
            <Wheat size={22} />
            <span>
              Raízes nordestinas.
              <br />
              <b>Novas combinações para descobrir.</b>
            </span>
          </div>
        </motion.div>
        <div className="hero-visual">
          <div className="sun-stamp">
            SABOR QUE
            <br />
            <strong>ACOLHE</strong>
            <span>✳</span>
          </div>
          <span className="visual-number">01 / À MESA</span>
          <img
            className="hero-photo"
            src="/images/cuscuz-ilustrativo.jpg"
            width="960"
            height="1200"
            fetchPriority="high"
            alt="Imagem ilustrativa criada por IA: cuscuz de milho com queijo coalho e carne seca"
          />
          <div className="dish-caption">
            <span>O ENCONTRO DOS SABORES</span>
            <strong>Cuscuz & afeto</strong>
            <small>Imagem ilustrativa criada por IA</small>
          </div>
          <span className="vertical-text">MILHO · TRADIÇÃO · NORDESTE</span>
        </div>
      </section>
      <div className="ribbon">
        <span>CUSCUZ DE RESPEITO</span>
        <i>✳</i>
        <span>TEM SABOR DE NORDESTE</span>
        <i>✳</i>
        <span>DA MASSA AO RECHEIO</span>
        <i>✳</i>
        <span>ESCOLHA SEU FAVORITO</span>
      </div>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PARA COMEÇAR BEM</div>
            <h2>
              Sabores que merecem
              <br />
              um lugar na sua mesa.
            </h2>
          </div>
          <Link className="text-link" to="/cardapio">
            Ver todo o cardápio <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
        <p className="source-caption">
          Valores transcritos do cardápio oficial. Confirme disponibilidade e
          valor final pelo WhatsApp.
        </p>
      </section>
      <section className="story-band">
        <div className="wrap story-grid">
          <div className="story-art">
            <Wheat size={90} strokeWidth={1} />
            <span>
              DA TERRA.
              <br />
              DA TRADIÇÃO.
              <br />
              <em>DO NORDESTE.</em>
            </span>
            <small>Um encontro de ingredientes e cultura</small>
          </div>
          <div>
            <div className="eyebrow">NOSSA IDENTIDADE</div>
            <h2>
              O Nordeste é<br />
              nosso ingrediente.
            </h2>
            <p>
              Milho, queijo coalho e carne seca se encontram no nosso cardápio.
              Dos cuscuzes tradicionais aos recheios especiais, cada escolha é
              um convite a conhecer essas combinações.
            </p>
            <Link className="text-link" to="/nossa-historia">
              Conhecer nossa proposta <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="eyebrow">DO SALGADO AO DOCE</div>
        <h2>Um cardápio. Muitas descobertas.</h2>
        <div className="experience-grid">
          {[
            [
              Wheat,
              "O milho é protagonista",
              "Do Original aos recheados: explore todas as versões de cuscuz.",
            ],
            [
              Utensils,
              "Além do cuscuz",
              "Tapiocas, pratos executivos, lanches e porções para escolher.",
            ],
            [
              Heart,
              "Um final doce",
              "Romeu & Julieta, coco, creme de avelã e outras sobremesas.",
            ],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Wheat;
            return (
              <div key={String(title)}>
                <I size={30} />
                <h3>{String(title)}</h3>
                <p>{String(desc)}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="cta wrap">
        <div>
          <div className="eyebrow">BATEU AQUELA VONTADE?</div>
          <h2>
            Seu próximo sabor
            <br />
            começa por aqui.
          </h2>
        </div>
        <Link className="button light" to="/cardapio">
          Montar meu pedido <ArrowUpRight size={20} />
        </Link>
      </section>
    </>
  );
}
