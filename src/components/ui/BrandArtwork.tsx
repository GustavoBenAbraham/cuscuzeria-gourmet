export function BrandArtwork({ className = "" }: { className?: string }) {
  return (
    <img
      className={`original-logo ${className}`.trim()}
      src="/images/logo%20cuscuzeira%20gourmet.jpg"
      width="150"
      height="150"
      alt="Cuscuzeria Gourmet — Sabor Nordestino"
      loading="eager"
      decoding="async"
    />
  );
}

export function RegionalMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`regional-motif ${className}`.trim()}
      viewBox="5 2 104 120"
      aria-hidden="true"
      focusable="false"
    >
      <image href="/images/cardapio/pagina-1.png" width="376" height="531" />
    </svg>
  );
}
