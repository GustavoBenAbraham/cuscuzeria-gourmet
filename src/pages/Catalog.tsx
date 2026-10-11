import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product, Category } from "../types";
import { catalogService } from "../services/catalog";
import { ProductCard } from "../components/products/ProductCard";
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function Catalog() {
  const [data, setData] = useState<{
    products: Product[];
    categories: Category[];
  } | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
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
    <section className="wrap section catalog">
      <div className="eyebrow">ESCOLHA. COMBINE. APROVEITE.</div>
      <h1>
        Nosso <em>cardápio.</em>
      </h1>
      <p>Cuscuz e muito mais. Encontre o seu próximo sabor.</p>
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
          onClick={() => setCategory("all")}
        >
          Todos
        </button>
        {data?.categories.map((c) => (
          <button
            key={c.id}
            className={category === c.id ? "selected" : ""}
            onClick={() => setCategory(c.id)}
          >
            {c.name}
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
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      <p className="source-caption">
        Fonte: cardápio oficial, 4 páginas. Valores e disponibilidade sujeitos à
        confirmação do restaurante. Imagens ilustrativas.
      </p>
    </section>
  );
}
