import { ArrowUpRight, BookOpen } from "lucide-react";
import { restaurant } from "../../data/restaurant";

const pages = [
  "Cuscuzes salgados e doces",
  "Pratos executivos",
  "Tapiocas, lanches, porções e salgados",
  "Sorvetes e sobremesas",
];
export function OriginalMenu() {
  return (
    <details className="original-menu">
      <summary>
        <BookOpen size={21} />
        <span>
          Ver cardápio original<small>As 4 páginas do restaurante</small>
        </span>
        <span className="original-menu-plus" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="original-menu-content">
        <p>
          Consulte as páginas que deram origem ao nosso catálogo. Para delivery,
          confira os valores atuais no iFood.
        </p>
        <div className="original-menu-grid">
          {pages.map((name, index) => (
            <figure key={name}>
              <a
                href={`/images/cardapio/pagina-${index + 1}.png`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir página ${index + 1}: ${name}`}
              >
                <img
                  src={`/images/cardapio/pagina-${index + 1}.png`}
                  width="376"
                  height="531"
                  loading="lazy"
                  alt={`Página ${index + 1} do cardápio original: ${name}`}
                />
              </a>
              <figcaption>
                {String(index + 1).padStart(2, "0")} · {name}
              </figcaption>
            </figure>
          ))}
        </div>
        <a
          className="text-link"
          href={restaurant.menu}
          target="_blank"
          rel="noreferrer"
        >
          Abrir original no Canva <ArrowUpRight size={17} />
        </a>
      </div>
    </details>
  );
}
