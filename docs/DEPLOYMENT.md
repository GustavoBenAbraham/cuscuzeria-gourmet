# Deployment Guide

## GitHub Pages (primary hosting)

- Public website: https://gustavobenabraham.github.io/cuscuzeria-gourmet-site/
- Private application source: https://github.com/GustavoBenAbraham/cuscuzeria-gourmet
- Public deployment files: https://github.com/GustavoBenAbraham/cuscuzeria-gourmet-site

The source repository stays private. The separate public repository contains the compiled website and its public assets; repository documentation and source history are not copied. GitHub Pages publishes its main branch from the repository root.

### Publish an update

After reviewing local changes, use an authenticated Git installation with write access to the deployment repository:

```sh
npm test
npm run build:pages
npm run test:pages
node scripts/publish-pages.mjs
```

Alternatively, `npm run publish:pages` builds and uploads the site. GitHub then runs its Pages deployment. This command publishes externally; local adjustments need only `npm run dev` or the normal build/preview commands.

The deployment helper maintains a separate checkout in the ignored `.openai/pages-publish/` directory, checks the destination remote, and copies only `dist-pages/`. Commit and push application changes separately to the private source repository.

### Local previews

`npm run build` and `npm run preview` keep the existing local site at http://127.0.0.1:4173/.

To verify the production Pages paths, run `npm run build:pages` followed by `npm run preview:pages`, then open http://127.0.0.1:4180/cuscuzeria-gourmet-site/.

### Routing and assets

Pages builds use `/cuscuzeria-gourmet-site/` as the base path. Asset URLs, icons, and the router share this base. The build emits an index.html for each configured route, so direct links and reloads work without server-side SPA rewrites. A 404.html handles unknown routes. Local development retains its root base path.

If adopting a custom domain, configure the domain in the deployment repository's Pages settings, adjust the Pages base path, and update the preview tests accordingly. Follow the exact DNS values supplied by GitHub.

## Previous hosting and general launch guidance

The prior Sites deployment is retained as a separate demonstration. This migration does not publish updates to Sites or delete that deployment.

## Current repository

The project is hosted in the private GitHub repository [GustavoBenAbraham/cuscuzeria-gourmet](https://github.com/GustavoBenAbraham/cuscuzeria-gourmet), on the `main` branch. The existing private Sites deployment is configured in `.openai/hosting.json`.

## Validate locally

```sh
npm ci
npm test
npm run build
npx playwright test
```

Browser tests require Chrome. Check navigation, mobile layouts, menu controls, WhatsApp and iFood destinations, social links, and final content. The production output is `dist/`.

## Push updates

Review changes before committing:

```sh
git status
git add README.md docs/
git commit -m "docs: update project documentation"
git push origin main
```

Stage the specific files relevant to each change. Dependencies, build output, and deployment archives are excluded by `.gitignore`.

## Hosting configuration

Use a static hosting provider with these project settings:

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA fallback | `index.html` |

Vercel is one possible hosting option: import the GitHub repository and configure the settings above. Configure rewrites so direct navigation to routes such as `/cardapio` works. Netlify can use the included `public/_redirects`. For Nginx, use `try_files $uri $uri/ /index.html;`.

For the existing Sites deployment, preserve the project ID and access settings in the hosting workflow. Uploading source to GitHub alone does not change the live site.

## Custom domain and HTTPS

Use an existing domain or register a new one. Add it through the selected hosting provider and copy the exact DNS records currently shown in that provider's dashboard. Configure the root domain and `www` as needed; do not assume a fixed IP address or CNAME target. Verify DNS resolution and HTTPS before sharing the domain.

## Launch checklist

- [x] Source uploaded to GitHub.
- [ ] Target production hosting and intended audience confirmed.
- [ ] Deployment URL and direct page navigation tested.
- [ ] Custom domain and DNS configured, if required.
- [ ] HTTPS verified.
- [ ] Restaurant name, WhatsApp, Instagram, iFood, and phone checked.
- [ ] Address, opening hours, and pickup details confirmed before inclusion.
- [ ] Current prices, availability, and menu content approved.
- [ ] Mobile layout and inquiry flow checked.
- [ ] Page title, description, favicon, canonical URL, and social image reviewed.

Keep customer-facing SEO text in Brazilian Portuguese. The original logo favicon is already integrated; a final domain and approved social image should be configured for commercial launch.

## Future improvements

Potential additions include analytics, approved marketing integrations, richer restaurant content, a verified location map, campaigns, and higher-resolution restaurant photographs. See [the source audit](SOURCES.md) for outstanding business information.
