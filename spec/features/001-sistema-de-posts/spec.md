# 001 · Núcleo editorial publicable

**Estado:** implementada

## Qué hace

Permite escribir y publicar el primer texto real:

- Content Layer moderna de Astro 5 con Markdown.
- Schema editorial estricto.
- URL individual por post.
- Layout de lectura con portada opcional.
- Borradores visibles en desarrollo y ausentes de producción.
- Tiempo de lectura y navegación entre textos.

## Modelo de post

- `title`: requerido.
- `description`: requerida.
- `pubDate`: requerida como fecha civil.
- `updatedDate`: opcional, solo para revisiones materiales.
- `topic`: requerido; `filosofia`, `educacion`, `mundo-editorial`, `inteligencia-artificial` o `general`.
- `draft`: booleano, `false` por defecto.
- `cover`: opcional.

## Criterios de aceptación

- [x] `src/content.config.ts` usa `glob()` y schema moderno.
- [x] Un texto real se publica en `/posts/<id>`.
- [x] No se usa Lorem Ipsum como contenido editorial.
- [x] El post muestra título, descripción, fecha, tema y tiempo de lectura.
- [x] La portada es opcional y su ausencia no rompe el layout.
- [x] Un borrador tiene ruta visible en desarrollo y no genera HTML ni aparece en producción.
- [x] Markdown largo, citas, listas, enlaces e imágenes se leen correctamente.
- [x] Las fechas usan `<time datetime>` y no cambian por zona horaria.
- [x] Build, lint y typecheck pasan.

## Fuera de alcance

- Portada alimentada por varios posts.
- Archivo y páginas de tema.
- RSS, sitemap y Open Graph completo.
- Editor visual, CMS y MDX.
