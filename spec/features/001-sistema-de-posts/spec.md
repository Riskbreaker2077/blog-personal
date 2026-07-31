# 001 · Sistema de posts

**Estado:** propuesta

## Qué hace

Convierte el blog de "una sola página con un post de prueba" a "un blog funcional con varios posts":

- Cada post en `src/content/posts/*.md` se renderiza en su propia URL (`/posts/<slug>`).
- La página de inicio lista los posts más recientes (últimos 5).
- Hay una página de archivo (`/archivo`) con todos los posts en orden cronológico inverso, agrupados por año.
- Hay páginas de tema (`/temas/<topic>`) que listan los posts de un mismo `topic` (educación, filosofía, corrección, oficio docente, general).
- Los posts marcados con `draft: true` no aparecen en producción.
- Cada post muestra: título, fecha, descripción, tiempo de lectura estimado, y (si existe) `updatedDate` con la nota "Actualizado el …".

## Por qué

Sin esta feature, escribir un segundo post implica editar el código de la página de inicio a mano. Con Content Collections de Astro, escribir un post = crear un archivo `.md`. Esa es la promesa de la constitución: "escribir debe ser barato".

## Criterios de aceptación

- [ ] Crear un post nuevo en `src/content/posts/` con frontmatter válido lo hace aparecer en la página de inicio, en `/archivo` y en la página de tema correspondiente, sin tocar ningún otro archivo.
- [ ] Crear un post con `draft: true` lo hace desaparecer de la build de producción (`pnpm build`) y seguir visible en `pnpm dev` (con algún indicador visual de que es borrador).
- [ ] Cada post tiene su URL propia basada en el slug del archivo.
- [ ] El archivo muestra los posts agrupados por año, con el año como encabezado.
- [ ] Las páginas de tema muestran solo los posts con ese `topic`. Si no hay posts para un tema, la página sigue existiendo con un mensaje "Aún no hay posts en este tema."
- [ ] El tiempo de lectura se calcula como `palabras / 200` redondeado hacia arriba, con el formato "≈ N min de lectura".
- [ ] Si un post tiene `updatedDate`, se muestra "Actualizado el DD/MM/AAAA" debajo de la fecha de publicación.
- [ ] Las URLs son limpias: `/posts/<slug>`, `/archivo`, `/temas/<topic>`. Sin trailing slash, sin extensión.
- [ ] El layout individual de un post usa el mismo `BaseLayout` pero con un contenedor más estrecho y la clase `.prose`.
- [ ] `pnpm build` y `pnpm astro check` siguen pasando limpios.

## Fuera de alcance

- Búsqueda full-text en el blog. Si la necesitamos, se evalúa en una feature posterior con Pagefind o similar.
- Paginación del archivo. Si llega a haber 50+ posts, se reconsidera. Por ahora, todos en una página.
- Etiquetas libres (más allá del enum `topic`). El enum de 5 valores es deliberadamente cerrado para evitar proliferación.
- Suscripción por email o RSS. Está en backlog como features separadas.
- Comentarios. No en la constitución.
