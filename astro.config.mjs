import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog.morenocaro.com",
  output: "static",
  /*
   * Hostinger sirve con LiteSpeed, compatible con Apache: una carpeta con
   * `index.html` responde a la URL con barra final. `directory` + `always`
   * dejan explícito lo que ya era el comportamiento por defecto, para que
   * ningún cambio futuro genere dos URLs distintas para el mismo texto.
   */
  build: { format: "directory" },
  trailingSlash: "always",
  integrations: [
    sitemap({
      // La 404 no es una página que un buscador deba indexar.
      filter: (pagina) => !pagina.includes("/404"),
    }),
  ],
});
