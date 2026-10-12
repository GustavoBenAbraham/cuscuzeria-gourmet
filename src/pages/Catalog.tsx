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
  const [category, setCategory] = useState(embedded ? "cuscuz" : "all");
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
        : a.name.localeCompare(b.name, "pt-BR"),
    );
  return (
    <section
      id="cardapio"
      className={`wrap section catalog${embedded ? " catalog-embedded" : ""}`}
      aria-label="Cardápio completo"
    >
      <div className="menu-heading">
        <div>
          <div className="eyebrow">FEITO DE SABORES. CHEIO DE NORDESTE.</div>
          <Title>
            Oxe, que <em>cardápio!</em>
          </Title>
          <p>
            Do cuscuz ao doce: escolha sua categoria, descubra os pratos e
            encontre seu favorito.
          </p>
        </div>
        <RegionalMotif />
      </div>
      <div className="menu-facts">
        <span>
          <b>{data?.products.length ?? "—"}</b> opções no cardápio
        </span>
        <span>
          <b>{data?.categories.length ?? "—"}</b> categorias para explorar
        </span>
        <span>
          Entrega pelo <b>iFood</b>
        </span>
      </div>
      <OriginalMenu />
      <div className="catalog-controls">
        <label className="search">
          <Search size={20} />
          <input
            placeholder="Busque por prato ou ingrediente"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pesquisar produtos"
          />
        </label>
        <label className="sort">
          <SlidersHorizontal size={18} />
          <select
            aria-label="Ordenar produtos"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="original">Ordem do cardápio</option>
            <option value="price">Menor preço</option>
            <option value="name">Nome A–Z</option>
          </select>
        </label>
      </div>
      <div className="categories" aria-label="Categorias">
        <button
          className={category === "all" ? "selected" : ""}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
        >
          Todos <span>{data?.products.length ?? 0}</span>
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
        <span aria-live="polite">{filtered.length} opções para descobrir</span>
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />{" "}
          Seleção da casa
        </label>
      </div>
      {error ? (
        <div role="alert" className="empty">
          Não foi possível carregar o cardápio.
          <button onClick={load}>Tentar novamente</button>
        </div>
      ) : !data ? (
        <p role="status">Preparando o cardápio…</p>
      ) : !filtered.length ? (
        <div className="empty">
          <Search size={36} />
          <h2>Nenhum sabor encontrado.</h2>
          <p>Tente outro nome ou explore todas as categorias.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setFeatured(false);
            }}
          >
            Limpar filtros
          </button>
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
                    opções
                  </small>
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
        Fonte: cardápio oficial, 4 páginas. Para delivery, valem os preços e a
        disponibilidade exibidos no iFood. Imagens ilustrativas.
      </p>
      <DeliveryCallout />
    </section>
  );
}
