# Roadmap

_Orden y estado de las features. Es la vista de "qué hay hecho, qué toca ahora y qué viene". Cada entrada apunta a su carpeta en `features/`._

## Hecho ✅

_Features completadas, en orden de implementación._

1. **000 · Proyecto base** — estructura Astro inicial con tipografía, layout, página de inicio, página "Sobre mí" y primer post de prueba. Sin features adicionales.

## Siguiente 🔜

_Lo próximo a abordar. Idealmente una sola feature "en curso" a la vez._

2. **001 · Sistema de posts completo** — Content Collections, listado cronológico, página individual de post, archivo, página de tema (`/temas/educacion`).

## Backlog / ideas 💡

_Sin comprometer ni ordenar del todo. Ideas que respetan la constitución._

- **Feed RSS / Atom** — el blog es estático, generar `rss.xml` es trivial y suma interoperabilidad con lectores de feeds.
- **Página 404 personalizada** — un texto breve en vez del 404 genérico de Hostinger.
- **Tiempo de lectura estimado** — calculado a partir del número de palabras. Mostrar junto a la fecha.
- **Sitemap XML** — para indexación. Astro lo genera con una integración oficial.
- **Open Graph y Twitter Cards** — imágenes sociales por post, para que al compartir un link se vea presentable.
- **Modo oscuro** — con un toggle en el Topbar. Decisión pendiente: ¿vale la pena para la audiencia?
- **Página de "Colofón"** — stack usado, tipografías, licencia del contenido (¿CC BY-SA? ¿todos los derechos reservados?).
- **Versión PDF por post** — descarga opcional. Útil para imprimir o leer sin conexión.

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.
