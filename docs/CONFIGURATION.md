# Site Configuration

The site uses versioned configuration files. Edit them, run validation, and publish a new build. No admin panel, database, or environment variables are required. Configuration is bundled into the public frontend: never put credentials or secrets in these files.

## Files

| File | Purpose |
| --- | --- |
| `src/config/site.json` | Business details, routes, navigation, SEO, assets, feature switches, locale, currency, and cart limits |
| `src/config/content.json` | Customer-facing copy, accessible labels, validation messages, and WhatsApp templates, grouped by component |
| `src/config/cordel.json` | Cordel booklet titles, edition numbers, artwork selections, and verse lines |
| `src/config/theme.json` | Brand colors, supplementary shades, font families and stylesheet URLs, content width, and logo sizes |
| `src/config/catalog.json` | Menu categories, products, ingredients, prices, availability, and source references |

Configuration keys and documentation use English. Customer-facing values remain in Brazilian Portuguese. Preserve product IDs when editing the catalog so existing carts keep their associations.

## Business and contact details

Change `restaurant.name`, `phone`, `instagram`, `menu`, and `deliveryUrl` in `site.json`. Use an international phone number containing digits only and HTTPS URLs. The display phone, Instagram handle, WhatsApp destination, content placeholders, and Restaurant JSON-LD are derived from these values.

Keep `confirmedOrderModes` empty unless the restaurant confirms direct WhatsApp fulfillment. Delivery through iFood does not imply direct WhatsApp delivery or pickup. The cart cannot be automatically transferred to iFood.

## Content and placeholders

Sections such as `Home`, `Cart`, `Catalog`, `Layout`, and `CordelGallery` contain descriptive keys such as `welcomeDescription`, `emptyTitle`, and `orderAction`. Preserve intentional spaces around text fragments and the placeholder names in each template.

Shared placeholders include `{restaurantName}`, `{restaurantNameUpper}`, `{phone}`, `{instagram}`, `{tagline}`, `{taglineUpper}`, cart limit names, `{menuPageCount}`, and `{cuscuzCount}`. Counts are derived from the configured menu pages and catalog. Dynamic templates use `{value0}`, `{value1}`, or `{note}`; the calling component supplies these values. React renders customer text as plain text, not HTML.

## Branding, images, and SEO

Set logo, hero, favicon, and home-screen icon paths under `branding`. Place files in `public/` and use root-relative paths. Keep their width and height values consistent with their actual dimensions. Favicon assets have separate paths: replacing the logo does not regenerate those image files.

The `seo` object controls the initial document title, description, social description, and browser theme color. Title and description support `{restaurantName}`. Navigation titles determine the page title after routing. Vite generates metadata, icon links, structured data, and theme variables from the same configuration used by the application.

The primary theme keys include `paper`, `ink`, `corn`, `terracotta`, `olive`, `ifoodRed`, and the `cordel*` colors. Supplementary `shade*` entries preserve the current design's nuanced colors. Change font families together with `fontStylesheets` when loading a new font. SVG drawing geometry and responsive layout rules remain in the component/stylesheets.

## Navigation and optional sections

Routes must be unique, and the home route remains `/`. Navigation IDs refer to keys in `routes`. Changing a route updates route registration and internal links; coordinate public URL changes with redirects on your hosting provider.

The `features` switches control the cordel gallery, original menu viewer, and floating WhatsApp button. `catalog.homeCategory` selects the initial home-page category and must match a category ID in the catalog. The dedicated menu starts with all categories.

Each cordel entry needs a unique `number`, title, verse lines, and one of the artwork kinds `corn`, `landscape`, or `music`. Add or remove entries to change the varal. Original menu images and their captions are configured in `menuPages`.

## Cart behavior

The quantity cap and field length limits are shared by controls, form validation, sanitization, and message validation where applicable. The `storageKey` identifies browser cart data; changing it starts a separate cart. Locale and currency affect formatting only and do not convert product prices.

## Validation and publication

```sh
npm test
npm run build
npx playwright test
```

Schema validation rejects malformed URLs, duplicate routes/navigation IDs, invalid limits, unknown cordel artwork, and malformed theme values. Unit tests exercise alternative configuration values and asset references. Browser tests cover customer flows, metadata, theme rendering, responsive layouts, storage failures, and cart limits. Restart the dev server if configuration edits are not reflected immediately.

Push the reviewed changes to GitHub and deploy the new production build. GitHub source updates alone do not update a hosted site. See [DEPLOYMENT.md](DEPLOYMENT.md).

Use `npm run check` to run the complete sequence, or `npm run test:e2e` for browser tests only. Existing product IDs are stored explicitly in `catalog.json`: reordering products does not change cart associations. Add a unique ID for each new product, keep `sourcePage` within the configured menu pages, and use an existing `categoryId`. Invalid catalog references and cordel definitions also fail Vite startup/build.

Cordel booklets use the supplied raster artwork. Each entry requires an `image` object with `src`, descriptive `alt`, and original `width`/`height`. Images use `object-fit: contain` to preserve the entire artwork. The `kind` field selects the existing booklet paper style.
