import { site } from "../config/site";
import { copy } from "../config/content";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product, Category } from "../types";
import { catalogService } from "../services/catalog";
import { ProductCard } from "../components/products/ProductCard";
import { DeliveryCallout } from "../components/ui/DeliveryCallout";
import { OriginalMenu } from "../components/products/OriginalMenu";
import { RegionalMotif } from "../components/ui/BrandArtwork";
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function Catalog({ embedded = false }: { embedded?: boolean }) {
  const Title = embedded ? "h2" : "h1";
  const [data, setData] = useState<{
    products: Product[];
    categories: Category[];
  } | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(embedded ? site.catalog.homeCategory : "all");
  const [featured, setFeatured] = useState(false);
  const [sort, setSort] = useState("original");
  function load() {
    setError(false);
    catalogService
      .getCatalog()
      .then(setData)
      .catch(() => setError(true));
  }
  useEffect(load, []);
  let filtered =
    data?.products.filter(
      (p) =>
        (category === "all" || p.categoryId === category) &&
        (!featured || p.featured) &&
        normalize(p.name + " " + p.description).includes(normalize(query)),
    ) || [];
  if (sort !== "original")
    filtered = [...filtered].sort((a, b) =>
      sort === "price"
        ? (a.price ?? Infinity) - (b.price ?? Infinity)
        : a.name.localeCompare(b.name, site.locale),
    );
  return (
    <section
      id={site.sections.menuId}
      className={`wrap section catalog${embedded ? " catalog-embedded" : ""}`}
      aria-label={copy.Catalog.regionLabel}
    >
      <div className="menu-heading">
        <div>
          <div className="eyebrow">{copy.Catalog.eyebrow}</div>
          <Title>
            {copy.Catalog.title}<em>{copy.Catalog.titleAccent}</em>
          </Title>
          <p>
            {copy.Catalog.description}</p>
        </div>
        <RegionalMotif />
      </div>
      <div className="menu-facts">
        <span>
          <b>{data?.products.length ?? "—"}</b> {copy.Catalog.productCountSuffix}</span>
        <span>
          <b>{data?.categories.length ?? "—"}</b> {copy.Catalog.categoryCountSuffix}</span>
        <span>
          {copy.Catalog.deliveryPrefix}<b>{copy.Catalog.deliveryProvider}</b>
        </span>
      </div>
      {site.features.originalMenu && <OriginalMenu />}
      <div className="catalog-controls">
        <label className="search">
          <Search size={20} />
          <input
            placeholder={copy.Catalog.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={copy.Catalog.searchLabel}
          />
        </label>
        <label className="sort">
          <SlidersHorizontal size={18} />
          <select
            aria-label={copy.Catalog.sortLabel}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="original">{copy.Catalog.sortOriginal}</option>
            <option value="price">{copy.Catalog.sortPrice}</option>
            <option value="name">{copy.Catalog.sortName}</option>
          </select>
        </label>
      </div>
      <div className="categories" aria-label={copy.Catalog.categoriesLabel}>
        <button
          className={category === "all" ? "selected" : ""}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
        >
          {copy.Catalog.allCategories}<span>{data?.products.length ?? 0}</span>
        </button>
        {data?.categories.map((c) => (
          <button
            key={c.id}
            className={category === c.id ? "selected" : ""}
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.name}{" "}
            <span>
              {data?.products.filter((p) => p.categoryId === c.id).length}
            </span>
          </button>
        ))}
      </div>
      <div className="results">
        <span aria-live="polite">{filtered.length} {copy.Catalog.resultsSuffix}</span>
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />{" "}
          {copy.Catalog.featuredLabel}</label>
      </div>
      {error ? (
        <div role="alert" className="empty">
          {copy.Catalog.loadError}<button onClick={load}>{copy.Catalog.retry}</button>
        </div>
      ) : !data ? (
        <p role="status">{copy.Catalog.loading}</p>
      ) : !filtered.length ? (
        <div className="empty">
          <Search size={36} />
          <h2>{copy.Catalog.emptyTitle}</h2>
          <p>{copy.Catalog.emptyDescription}</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setFeatured(false);
            }}
          >
            {copy.Catalog.clearFilters}</button>
        </div>
      ) : (
        <div className="menu-groups">
          {data.categories
            .filter((c) => filtered.some((p) => p.categoryId === c.id))
            .map((c) => (
              <section className="menu-group" key={c.id} aria-label={c.name}>
                <div className="menu-group-heading">
                  <span aria-hidden="true">
                    {String(
                      data.categories.findIndex((item) => item.id === c.id) + 1,
                    ).padStart(2, "0")}
                  </span>
                  <h3>{c.name}</h3>
                  <i aria-hidden="true" />
                  <small>
                    {filtered.filter((p) => p.categoryId === c.id).length}{" "}
                    {copy.Catalog.categoryCountLabel}</small>
                </div>
                <div className="menu-product-grid">
                  {filtered
                    .filter((p) => p.categoryId === c.id)
                    .map((p) => (
                      <ProductCard key={p.id} product={p} compact />
                    ))}
                </div>
              </section>
            ))}
        </div>
      )}
      <p className="source-caption">
        {copy.Catalog.sourceNotice}</p>
      <DeliveryCallout />
    </section>
  );
}
