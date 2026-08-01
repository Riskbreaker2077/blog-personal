# 003 · Distribución e indexación

**Estado:** implementada salvo la imagen social

## Qué hace

Prepara el blog para buscadores, lectores de feeds y enlaces compartidos:

- RSS.
- Sitemap y `robots.txt`.
- URL canónica y metadatos sociales.
- Datos estructurados de artículo.
- Página 404.
- Imagen social predeterminada original.

## Criterios de aceptación

- [x] RSS contiene solo posts publicados y URLs absolutas.
- [x] Sitemap contiene rutas públicas y omite borradores.
- [x] Cada página tiene título, descripción y canonical correctos.
- [x] Cada post expone metadatos Open Graph y `BlogPosting`.
- [ ] La imagen social tiene autoría o licencia compatible. **Bloqueada: la hace Camilo.**
- [x] La 404 orienta al índice y archivo.
- [x] No se incorpora analítica invasiva.

## Fuera de alcance

- Imágenes sociales generadas por post, newsletter y analítica.
