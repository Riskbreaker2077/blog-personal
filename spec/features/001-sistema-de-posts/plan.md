# 001 · Sistema de posts — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Aprovechar la Content Collections API de Astro, que ya quedó configurada en la feature 000. Construir tres páginas dinámicas (`index`, `archivo`, `temas/[topic]`) y una ruta por post (`posts/[...slug]`). Toda la lectura de posts se hace con `getCollection('posts')` filtrando por `draft`.

El `topic` se mantiene como enum cerrado en el schema. Las páginas de tema se generan estáticamente con `getStaticPaths` para que Astro emita una página por cada `topic` del enum, no solo los que tienen posts.

El tiempo de lectura se calcula en un helper `src/lib/reading-time.ts` que cuenta palabras con una regex simple sobre el body de Markdown.

## Implementación

_Pasos técnicos concretos, en orden. Indica los archivos/módulos que se tocan._

1. **Crear `src/lib/reading-time.ts`** — función `readingTime(body: string): number` que devuelve minutos enteros redondeados hacia arriba (asumiendo 200 palabras por minuto). Exporta también un helper `formatReadingTime(min: number): string` que devuelve "≈ N min de lectura".
2. **Crear `src/lib/posts.ts`** — helpers comunes:
   - `getAllPosts()`: devuelve todos los posts, sin drafts, ordenados por `pubDate` descendente.
   - `getPublishedPosts()`: igual pero acepta un flag para incluir drafts.
   - `getPostsByTopic(topic)`: filtra por topic.
   - `getPostsByYear(year)`: agrupa por año de `pubDate`.
3. **Crear `src/pages/posts/[...slug].astro`** — ruta dinámica. `getStaticPaths` itera sobre los posts publicados, la página renderiza el post usando `BaseLayout` y un nuevo layout `src/layouts/PostLayout.astro`.
4. **Crear `src/layouts/PostLayout.astro`** — extiende `BaseLayout`. Acepta el post como prop. Muestra: título (`h1`), fecha formateada, descripción como bajada, indicador de "Actualizado el …" si aplica, tiempo de lectura, y el contenido (`<slot />`).
5. **Reescribir `src/pages/index.astro`** — `getCollection('posts')` con filtro de draft, slice a los 5 más recientes, lista con título + fecha + descripción + tiempo de lectura + enlace a `/posts/<slug>`. Enlace visible al final: "Ver archivo completo →".
6. **Crear `src/pages/archivo.astro`** — todos los posts sin drafts, agrupados por año, año como `<h2>`. Lista de cada año en orden descendente.
7. **Crear `src/pages/temas/[topic].astro`** — `getStaticPaths` sobre los valores del enum `topic` definidos en `content/config.ts`. Cada página lista los posts con ese topic, mensaje de "Aún no hay posts" si está vacía.
8. **Actualizar `src/components/Topbar.astro`** — añadir enlace a `/archivo`. (Los enlaces a temas van en cada página, no en la navegación superior, para no saturar.)
9. **Añadir al schema de posts en `src/content/config.ts`** — ya debería tener `topic` como enum, pero si se quedó solo como string, ajustar a `enum` con los 5 valores.
10. **Crear 2-3 posts de prueba** — uno por cada topic (`educacion`, `filosofia`, `general`), con `pubDate` distintos, para verificar que la agrupación y el filtrado funcionan.
11. **Validar con `astro check` y `pnpm build`** — el build debe omitir los drafts y emitir todas las páginas estáticas.

## Decisiones

_Elecciones de diseño relevantes y su justificación. Alternativas descartadas y por qué._

- **Enum cerrado para `topic`** — cinco valores definidos en el schema. Si aparece un sexto, se añade explícitamente. Mejor que etiquetas libres: obliga a pensar si merece un tema nuevo.
- **Tiempo de lectura a 200 palabras/minuto** — convención estándar. Más rápido (250) subestima a lectores cuidadosos; más lento (150) aburre a lectores habituales.
- **Drafts solo ocultos en producción** — en `dev` se ven para poder previsualizarlos. Indicador visual: clase `.draft` que añade un borde o un texto "(borrador)" en la parte superior.
- **Sin paginación en archivo** — si se llega a 50 posts, se reconsidera. Por ahora, una sola página larga es más simple y descubrible.
- **Páginas de tema pregeneradas incluso si están vacías** — URL estable `/temas/correccion` existe aunque no haya posts. Evita 404 si alguien enlaza esperando que el tema exista.
- **Lectura de posts en build-time** — todo `getCollection` corre en `astro build`, no hay API runtime. Consistente con `output: 'static'`.

## Riesgos

_Qué puede salir mal o requerir cuidado, y cómo se mitiga._

- **Frontmatter inválido rompe el build** — Astro es estricto con el schema. Mitigación: validar el schema antes de `pnpm build` con `pnpm astro sync`, que falla rápido si un post no cumple.
- **El cálculo de palabras del Markdown incluye frontmatter y sintaxis** — si se cuenta mal, el tiempo de lectura es absurdo. Mitigación: pasar a `readingTime` solo el `post.body` (excluye frontmatter, que Astro ya maneja) y no las marcas de Markdown (la regex `\b\w+\b` ya las ignora).
- **Agrupación por año en archivo con zona horaria** — un post publicado el 1 de enero a las 00:30 en Bogotá puede aparecer como "año anterior" si el servidor está en UTC. Mitigación: usar `toLocaleDateString('es-CO', { timeZone: 'America/Bogota', year: 'numeric' })` para extraer el año, no `getFullYear()`.
- **Topic como string en vez de enum** — si la feature 000 lo dejó como string libre, los `getStaticPaths` se rompen (no hay valores fijos para iterar). Mitigación: revisar el schema en el primer paso y convertir a enum antes de continuar.
