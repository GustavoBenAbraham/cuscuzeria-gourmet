# Deployment Guide

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
