import { site } from "../../config/site";
import { copy } from "../../config/content";
export function BrandArtwork({ className = "" }: { className?: string }) {
  return (
    <img
      className={`original-logo ${className}`.trim()}
      src={site.branding.logo}
      width={site.branding.logoWidth}
      height={site.branding.logoHeight}
      alt={copy.BrandArtwork.logoAlt}
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
      <image href={site.menuPages[0]?.image} width="376" height="531" />
    </svg>
  );
}
