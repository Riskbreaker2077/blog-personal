import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog.morenocaro.com",
  output: "static",
  integrations: [
    sitemap({
      // La 404 no es una página que un buscador deba indexar.
      filter: (pagina) => !pagina.includes("/404"),
    }),
  ],
});
