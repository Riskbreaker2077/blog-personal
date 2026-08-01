# 000 · Fundamento visual y técnico

**Estado:** implementada

## Qué hace

Establece el sistema visual definitivo y el cascarón técnico del blog:

- Proyecto Astro 5 estático con TypeScript estricto y pnpm.
- Tokens de color, tipografía y espaciado.
- Layout raíz, navegación y footer.
- Portada representativa sin depender todavía de la colección de posts.
- Página “Sobre mí”.
- Accesibilidad, responsive y metadatos globales básicos.

La dirección está definida en `../../diseno/direccion-visual.md`.

## Criterios de aceptación

- [x] Astro queda fijado a una versión exacta de la major 5.
- [x] `pnpm dev`, `pnpm build`, `pnpm lint` y `pnpm astro check` pasan.
- [x] Índice y “Sobre mí” comparten un sistema visual coherente con el referente.
- [x] La interfaz conserva la identidad editorial y usa el retrofuturismo solo como acento.
- [x] Navegación utilizable con teclado, foco visible y enlace para saltar al contenido.
- [x] Contraste WCAG AA y `prefers-reduced-motion`.
- [x] Diseño correcto desde 360 px hasta escritorio.
- [x] Ningún archivo de `referente-de-diseno/` aparece en `dist/`.
- [x] No hay panel de ajustes, cursor personalizado ni JavaScript decorativo.

## Fuera de alcance

- Content Collection y páginas reales de post.
- Archivo y páginas de tema.
- RSS, sitemap, Open Graph completo y 404.
- Modo oscuro.
- Despliegue.
