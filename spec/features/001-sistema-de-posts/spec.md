# 001 · Núcleo editorial publicable

**Estado:** propuesta

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

- [ ] `src/content.config.ts` usa `glob()` y schema moderno.
- [ ] Un texto real se publica en `/posts/<id>`.
- [ ] No se usa Lorem Ipsum como contenido editorial.
- [ ] El post muestra título, descripción, fecha, tema y tiempo de lectura.
- [ ] La portada es opcional y su ausencia no rompe el layout.
- [ ] Un borrador tiene ruta visible en desarrollo y no genera HTML ni aparece en producción.
- [ ] Markdown largo, citas, listas, enlaces e imágenes se leen correctamente.
- [ ] Las fechas usan `<time datetime>` y no cambian por zona horaria.
- [ ] Build, lint y typecheck pasan.

## Fuera de alcance

- Portada alimentada por varios posts.
- Archivo y páginas de tema.
- RSS, sitemap y Open Graph completo.
- Editor visual, CMS y MDX.
