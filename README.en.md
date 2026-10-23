# Cuscuzeria Gourmet 🌽

[Português](README.md) | **English**

**Professional project: a restaurant website and digital menu for a business specializing in northeastern Brazilian cuisine.**

The website presents the restaurant, organizes its menu and links customers to its service and delivery channels. Its visual identity draws on northeastern Brazilian culture, with responsive navigation for desktop and mobile.

[Visit the website](https://gustavobenabraham.github.io/cuscuzeria-gourmet-site/) · [Configuration guide](docs/CONFIGURATION.md) · [Deployment guide](docs/DEPLOYMENT.md)

![Desktop home page](docs/screenshots/home-desktop.png)

## Work context

The project translates a real business's needs into structured menu data, visual design, navigation and a deployable frontend. Customer service takes place through external channels: the website does not process payments or confirm orders.

## Features

- A 64-item digital menu with categories, accent-insensitive search and product sorting.
- A browser-persisted cart with quantity controls, item notes and monetary calculations in cents.
- A prepared WhatsApp message based on selected items; the customer confirms sending in WhatsApp.
- Links to iFood delivery. The local cart is not transferred automatically to iFood.
- Responsive layouts, regional visual identity and restaurant branding.
- Keyboard navigation, visible focus, labeled forms and reduced-motion support.
- Restaurant metadata and structured data.
- Centralized menu, content, route, branding and cart-limit configuration.

## Screenshots

![Desktop menu](docs/screenshots/menu-desktop.png)

| Mobile home | Mobile cart |
| --- | --- |
| ![Mobile home](docs/screenshots/home-mobile.png) | ![Mobile cart](docs/screenshots/cart-mobile.png) |

## Technologies

React 19, TypeScript, Vite, Tailwind CSS 4, React Router, React Hook Form, Zod, Motion, Lucide React and localStorage. Vitest covers unit behavior; Playwright covers browser flows. GitHub Pages hosts the published frontend.

## What I learned

- Translate business requirements into features and service flows.
- Structure a typed React application into pages, components, hooks, services and domain rules.
- Organize real menu information with traceable prices and categories.
- Restore cart state, handle invalid saved data and keep money calculations consistent.
- Validate forms and configuration with useful feedback.
- Design for small screens, keyboard access and reduced motion.
- Prepare external-channel integrations while explaining their boundaries.
- Test and publish a frontend with correct routes and asset paths.

## Run locally

Requires Node.js 22.12 or later and npm; the existing project documentation records validation with Node.js 24.

```bash
git clone https://github.com/GustavoBenAbraham/cuscuzeria-gourmet.git
cd cuscuzeria-gourmet
npm ci
npm run dev
```

Open the address printed by Vite, usually `http://127.0.0.1:5173`. On Windows, use `npm.cmd` if PowerShell blocks `npm`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm test` | Unit tests |
| `npm run build` | Type checks and production build |
| `npm run preview` | Preview the build |
| `npm run test:e2e` | Browser tests; requires Google Chrome |
| `npm run check` | Unit tests, build and browser tests |
| `npm run build:pages` | GitHub Pages build |
| `npm run test:pages` | Verify the Pages build |

## Organization and decisions

`src/` contains components, config, data, hooks, pages, services, styles, types and utilities. `public/` holds assets, `tests/` browser tests, `docs/` screenshots and supporting documents, and `scripts/` publishing/preview utilities.

The catalog lives in `src/config/catalog.json`. The catalog service can later evolve to call an API. The current app has no backend, authentication, live inventory or payment processing. iFood determines delivery availability, fees and conditions.

Unit tests exercise calculations, cart recovery, limits, configuration and message construction. Browser tests exercise search, navigation, persistence, validation and layouts without sending messages to the restaurant. Tests were not rerun for this documentation-only update.

The main couscous photograph is an illustrative AI-generated image, identified in the interface. See [sources](docs/SOURCES.md) and [image provenance](docs/IMAGE-PROMPT.md). Supporting documents currently remain in Portuguese.

## Author and materials

Developed by [Gustavo Ben Abraham](https://github.com/GustavoBenAbraham) for Cuscuzeria Gourmet.

The restaurant's brand, logo and materials belong to their respective owners. Making the repository public does not itself grant permission to reuse these materials.
