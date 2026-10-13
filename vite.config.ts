import "./src/data/catalog";
import cordel from "./src/config/cordel.json" with { type: "json" };
import { cordelSchema } from "./src/config/schema";
cordelSchema.parse(cordel);
import { documentHead } from "./src/config/document";
import { site } from "./src/config/site";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss(), { name: "site-configuration", transformIndexHtml(html) { return html.replace("%SITE_LOCALE%", site.locale).replace("<!-- SITE_HEAD -->", documentHead()); } }],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["motion/react"],
          forms: ["react-hook-form", "zod", "@hookform/resolvers/zod"],
        },
      },
    },
  },
});
