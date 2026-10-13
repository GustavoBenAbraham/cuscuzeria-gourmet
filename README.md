# Cuscuzeria Gourmet

Responsive restaurant website and digital menu inspired by northeastern Brazilian culture. Built with React, TypeScript, Vite, Tailwind CSS, React Router, Lucide, Motion, React Hook Form, and Zod.

The customer interface is intentionally in Brazilian Portuguese. Repository documentation, code comments, and test descriptions use English.

## Getting started

Requires Node.js 22.12 or later (validated with 24.19) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, usually http://127.0.0.1:5173. On PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm test` | Run unit tests |
| `npx playwright test` | Run browser tests using installed Chrome |
| `npm run build` | Check TypeScript and build into `dist/` |
| `npm run preview` | Preview the production build |

## Features

- 64 menu options checked against the four original menu pages.
- Accent-insensitive search, category filters, featured items, and sorting.
- Persistent cart with quantities from 1 to 99, item notes, removal, and totals calculated in cents. Invalid, duplicate, and unavailable entries are sanitized on restoration.
- Validated customer name and notes. Form data stays in memory; cart items and notes are stored in the browser.
- Delivery through the official iFood store. Customers select items and complete checkout there; the local cart is not transferred automatically. Prices, availability, delivery fees, coverage, and estimates are determined by iFood.
- WhatsApp inquiries about selected items. Customers confirm sending in WhatsApp; the website does not assume receipt or automatically clear the cart.
- Semantic HTML, keyboard focus, skip navigation, labeled forms, announced errors, reduced-motion support, basic metadata, and Restaurant JSON-LD based on documented information.
- Original restaurant logo in the header, footer, favicon, and home-screen icon.

This is a demonstration frontend without a backend, payments, or authentication. `confirmedOrderModes` covers only direct WhatsApp fulfillment and remains empty. Pickup is unconfirmed; iFood delivery does not enable address collection or direct delivery checkout through WhatsApp. The local selection does not reserve inventory or complete a sale.

## Project structure

```text
src/
  components/layout/   Header, mobile navigation, and footer
  components/ui/       Shared interface elements and SVG artwork
  components/products/ Menu cards and quantity controls
  data/                Editable menu and restaurant information
  hooks/               Cart state and persistence
  pages/               Home, menu, order, story, and contact pages
  services/            Asynchronous catalog interface
  types/               Shared domain types
  utils/               Calculations, sanitization, and WhatsApp messages
  styles/              Responsive styles and Tailwind
public/                Static assets, images, and icons
docs/                  Sources, image provenance, deployment, and proposal
tests/                 Browser tests
```

## Maintaining the menu and images

Edit `src/data/catalog.ts`. Use `verificationStatus: 'pending'`, `price: null`, or `available: false` for unconfirmed items; ordering will be disabled. Add authorized images under `public/images/` and set `image` to their public path. Product images load lazily and retain their proportions. Items without photographs use a text-based presentation.

The AI-generated hero image at `public/images/cuscuz-ilustrativo.jpg` is visibly labeled as illustrative. See [image provenance](docs/IMAGE-PROMPT.md). The original 150 ? 150 logo is preserved at `public/images/logo cuscuzeira gourmet.jpg` and rendered by `BrandArtwork`. Existing asset names and Portuguese customer-facing routes are retained for compatibility.

Regional styling lives in `src/styles/nordeste.css`; `SertaoArt` provides original SVG artwork. Fortal Cuscuz informed the visual organization; no competitor photographs or commercial content were reused.

The home page initially shows savory cuscuz, while `/cardapio` shows all 64 options. Both support search, categories, and quantity controls. An expandable section displays the four original pages in `public/images/cardapio/`.

`catalogService.getCatalog()` is the replacement point for a future REST API. Preserve types and stable IDs when integrating a backend such as Spring Boot/PostgreSQL.

## Validation

Unit tests cover currency calculations, corrupted state, duplicates, quantity limits, unavailable and pending products, WhatsApp encoding, and rejection of unconfirmed fulfillment modes. Catalog checks cover IDs, categories, item counts, source references, and critical price associations.

Browser tests cover 360, 768, and 1440 pixel viewports, navigation, search, persistence, quantities, and the inquiry flow. They start a separate Vite server and do not send messages to the restaurant.

## Deployment

Serve `dist/` with an SPA fallback to `index.html` for React Router. A Netlify example is provided in `public/_redirects`; Nginx can use `try_files $uri $uri/ /index.html;`. The existing `.openai/hosting.json` identifies the private Sites demonstration deployment.

See the [deployment guide](docs/DEPLOYMENT.md), [source audit](docs/SOURCES.md), and [commercial proposal](docs/COMMERCIAL_PROPOSAL.md).

Before commercial launch, verify the outstanding business information in the source audit. Logo and photo authorization has already been confirmed. Future improvements include higher-resolution food photographs, live availability, and catalog administration. Google Fonts currently load externally with local font fallbacks; self-hosting requires the appropriate font licenses.
