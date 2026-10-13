import { assetPath } from "../../config/paths";
import { site } from "../../config/site";
import { copy, formatText } from "../../config/content";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { restaurant } from "../../data/restaurant";

const pages = site.menuPages;
export function OriginalMenu() {
  return (
    <details className="original-menu">
      <summary>
        <BookOpen size={21} />
        <span>
          {copy.OriginalMenu.title}<small>{copy.OriginalMenu.pageCount}</small>
        </span>
        <span className="original-menu-plus" aria-hidden="true">
          {copy.OriginalMenu.expandSymbol}</span>
      </summary>
      <div className="original-menu-content">
        <p>
          {copy.OriginalMenu.description}</p>
        <div className="original-menu-grid">
          {pages.map(({ title: name, image, width, height }, index) => (
            <figure key={name}>
              <a
                href={assetPath(image)}
                target="_blank"
                rel="noreferrer"
                aria-label={formatText(copy.OriginalMenu.openPageLabel, {value0: index + 1, value1: name})}
              >
                <img
                  src={assetPath(image)}
                  width={width}
                  height={height}
                  loading="lazy"
                  alt={formatText(copy.OriginalMenu.pageImageAlt, {value0: index + 1, value1: name})}
                />
              </a>
              <figcaption>
                {String(index + 1).padStart(2, "0")} {copy.OriginalMenu.captionSeparator}{name}
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
          {copy.OriginalMenu.openSource}<ArrowUpRight size={17} />
        </a>
      </div>
    </details>
  );
}
