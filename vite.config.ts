import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import "./src/data/catalog";
import cordel from "./src/config/cordel.json" with { type: "json" };
import { cordelSchema } from "./src/config/schema";
cordelSchema.parse(cordel);
import { documentHead } from "./src/config/document";
import { site } from "./src/config/site";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => {
 const pages = mode === "pages";
 const base = pages ? (process.env.PAGES_BASE_PATH || "/cuscuzeria-gourmet-site/") : "/";
 return {
  base,
  plugins: [react(), tailwindcss(), { name: "pages-route-entries", closeBundle() { if (!pages) return; for (const route of Object.values(site.routes).filter(route => route !== "/")) { const directory = resolve("dist-pages", route.slice(1)); mkdirSync(directory, { recursive: true }); copyFileSync("dist-pages/index.html", resolve(directory, "index.html")); } copyFileSync("dist-pages/index.html", "dist-pages/404.html"); writeFileSync("dist-pages/.nojekyll", ""); } }, { name: "site-configuration", transformIndexHtml(html) { return html.replace("%SITE_LOCALE%", site.locale).replace("<!-- SITE_HEAD -->", documentHead(base)); } }],
  build: {
    outDir: pages ? "dist-pages" : "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["motion/react"],
          forms: ["react-hook-form", "zod", "@hookform/resolvers/zod"],
        },
      },
    },
  },
};
});
