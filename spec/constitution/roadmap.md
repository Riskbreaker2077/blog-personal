# Roadmap

_Orden y estado de las features. Solo hay una feature siguiente a la vez._

## Hecho ✅

1. **000 · Fundamento visual y técnico** — Astro 5, sistema visual, layout, navegación, portada representativa y página “Sobre”.
2. **001 · Núcleo editorial publicable** — Content Layer moderna, schema, página individual y borradores. Primer texto real publicado: «Las máquinas de escribir».
3. **002 · Índice, archivo y temas** — portada con los cinco textos más recientes, línea cronológica agrupada por año, archivo completo y una página por tema.
4. **003 · Distribución e indexación** — RSS, sitemap, `robots.txt`, canonical, Open Graph, `BlogPosting` y 404. Imagen social resuelta el 2 de agosto de 2026.
5. **004 · Despliegue en Hostinger** — dominio, build de producción, publicación, verificación y rollback documentado. **El sitio está en línea en `https://blog.morenocaro.com` desde el 2 de agosto de 2026.**

## Sin feature asignada ⚠️

Trabajo hecho el 2 de agosto de 2026 sobre un sitio ya publicado, sin carpeta en `spec/features/`. Está pendiente decidir si se formaliza como feature 005 o se absorbe en la 000:

- **Grafo de ideas de la portada** — `src/components/GrafoCerebral.astro`.
- **Puntuación teñida con el color del tema** — `src/lib/rehype-puntuacion.mjs`.

## Siguiente 🔜

_Sin definir._ El blog cumple su función: se escribe un `.md`, se commitea y se publica. Lo siguiente debería salir del uso real, no de la lista de ideas.

## Backlog / condicionado por uso real 💡

- Página `/ahora`.
- Página `/proyectos`.
- Series editoriales.
- Buscador estático con Pagefind.
- Imágenes sociales generadas por post.
- Barra de progreso para textos largos.
- PDF por post.
- Newsletter.

> Cada feature se implementa solo después de aprobar su spec y plan. El despliegue requiere confirmación explícita.
