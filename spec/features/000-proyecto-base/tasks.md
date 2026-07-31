# 000 · Proyecto base — Tareas

_Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas._

- [ ] Ejecutar `pnpm create astro@latest . --template minimal --typescript strict --no-install --no-git --skip-houston`.
- [ ] Renombrar el paquete en `package.json` a `blog-personal`.
- [ ] Añadir scripts `lint` y `astro check` en `package.json`.
- [ ] Crear `astro.config.mjs` con `output: 'static'`, `site` placeholder, `integrations: []`.
- [ ] Crear `src/content/config.ts` con el schema de la colección `posts`.
- [ ] Crear `src/styles/global.css` con reset, variables y `.prose`.
- [ ] Crear `src/layouts/BaseLayout.astro` con props `title` y `description`.
- [ ] Crear `src/components/Topbar.astro` con dos enlaces (inicio, sobre mí).
- [ ] Crear `src/pages/index.astro` que cargue el post de prueba.
- [ ] Crear `src/pages/sobre.astro` con texto provisional.
- [ ] Crear `src/content/posts/hola-mundo.md` con frontmatter completo.
- [ ] Reescribir `README.md` raíz con stack, comandos, estructura.
- [ ] Reforzar `.gitignore`: añadir `.astro/`, `dist/`, `node_modules/`, `*.log`, `.env*`. **No** ignorar `referente-de-diseno/`.
- [ ] Configurar `astro.config.mjs` para excluir `referente-de-diseno/` del build (vía `vite.exclude` o equivalente).
- [ ] `pnpm install` y verificar que termina sin errores.
- [ ] `pnpm dev` y verificar que la página carga en `localhost:4321`.
- [ ] `pnpm build` y verificar que `dist/` se genera sin warnings.
- [ ] `pnpm lint` y `pnpm astro check` limpios.
- [ ] Validar manualmente que el sitio se ve bien en una ventana de 360px de ancho.
- [ ] Validar contra los criterios de aceptación de `spec.md`.
- [ ] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

_Opcional. Pasos a repetir cada vez que se toque esta feature en el futuro. Borra esta sección si no aplica._

- [ ] Si se actualiza Astro, revisar breaking changes y ajustar el `astro.config.mjs` si hace falta.
- [ ] Si se añade una nueva colección de contenido, replicar el patrón de `posts` en `src/content/config.ts`.
