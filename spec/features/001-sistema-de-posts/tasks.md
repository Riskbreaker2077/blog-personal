# 001 · Sistema de posts — Tareas

_Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas._

- [ ] Verificar que el schema en `src/content/config.ts` define `topic` como `enum` con los 5 valores (`educacion`, `filosofia`, `correccion`, `oficio-docente`, `general`). Si está como string, convertirlo a enum.
- [ ] Crear `src/lib/reading-time.ts` con `readingTime(body)` y `formatReadingTime(min)`.
- [ ] Crear `src/lib/posts.ts` con `getAllPosts`, `getPostsByTopic`, `getPostsByYear`.
- [ ] Crear `src/layouts/PostLayout.astro` que extienda `BaseLayout` y muestre metadatos.
- [ ] Crear `src/pages/posts/[...slug].astro` con `getStaticPaths`.
- [ ] Reescribir `src/pages/index.astro` para listar los 5 posts más recientes.
- [ ] Crear `src/pages/archivo.astro` agrupado por año.
- [ ] Crear `src/pages/temas/[topic].astro` con `getStaticPaths` sobre el enum.
- [ ] Actualizar `src/components/Topbar.astro` con enlace a `/archivo`.
- [ ] Crear 3 posts de prueba: uno por cada topic (`educacion`, `filosofia`, `general`), con fechas distintas.
- [ ] Crear un post con `draft: true` y verificar que no aparece en `pnpm build`.
- [ ] Verificar con `pnpm dev` que un post con draft sí se ve y tiene el indicador visual.
- [ ] `pnpm astro check` limpio.
- [ ] `pnpm build` limpio y verificar que `dist/` contiene `archivo/index.html`, `temas/<topic>/index.html` y `posts/<slug>/index.html` por cada post publicado.
- [ ] Validar manualmente: crear un nuevo post con frontmatter válido, `pnpm dev`, y comprobar que aparece en inicio, archivo y tema.
- [ ] Validar contra los criterios de aceptación de `spec.md`.
- [ ] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

- [ ] Si se añade un nuevo valor al enum `topic`, actualizar `content/config.ts`, regenerar el `getStaticPaths` de `temas/[topic].astro`, y documentar el nuevo tema en el README si tiene descripción pública.
- [ ] Si la cantidad de posts publicados supera ~30, evaluar paginación del archivo.
