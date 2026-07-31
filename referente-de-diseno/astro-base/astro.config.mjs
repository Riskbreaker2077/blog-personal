import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Cambia esto a tu dominio cuando lo tengas (afecta sitemap, RSS, og:url).
  site: 'https://camilomoreno.co',

  // Markdown sin retoques especiales — usamos blockquotes para pull quotes
  // y HTML inline para notas tipo tooltip.
  markdown: {
    smartypants: true,
    shikiConfig: {
      theme: 'css-variables',
      wrap: true,
    },
  },
});
