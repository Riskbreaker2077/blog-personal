import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { rehypePuntuacion } from "./src/lib/rehype-puntuacion.mjs";

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
  markdown: {
    // Marca los signos de puntuación para que tomen el color del tema del post.
    rehypePlugins: [rehypePuntuacion],
  },
  integrations: [
    sitemap({
      // La 404 no es una página que un buscador deba indexar.
      filter: (pagina) => !pagina.includes("/404"),
    }),
  ],
});
