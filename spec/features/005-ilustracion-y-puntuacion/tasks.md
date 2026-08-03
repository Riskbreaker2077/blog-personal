# 005 · Ilustración de portada y puntuación temática — Tareas

_Escritas a posteriori: el código ya estaba en producción cuando se creó esta carpeta. Ver la nota de procedimiento en `spec.md`._

- [x] Crear `src/components/GrafoCerebral.astro` a partir del componente suelto, adaptado al proyecto.
- [x] Leer la paleta de los tonos de tema y reaccionar al cambio de tema claro/oscuro.
- [x] Parar el bucle fuera de pantalla y con `prefers-reduced-motion`.
- [x] Arreglar el gesto táctil: `touch-action: pan-y` e interacción solo con ratón.
- [x] Sustituir el marcador del hero en `src/pages/index.astro`, sin marco ni pie.
- [x] Disolver los bordes con `mask-image` radial. **`closest-side`, no el valor por defecto**: con `farthest-corner` el lienzo se cortaba en seco encima de los filtros.
- [x] Ocultar el grafo bajo 47.5rem.
- [x] Proteger la selección de texto y los filtros con `z-index`.
- [x] Crear `src/lib/rehype-puntuacion.mjs` y registrarlo en `astro.config.mjs`.
- [x] Teñir la puntuación por tono en `src/layouts/PostLayout.astro`, mezclada con la tinta.
- [x] Validar: ESLint limpio, `astro check` 0/0/0, build de 10 páginas.
- [x] Comprobar en el HTML publicado que los `<span class="punct">` existen y que `data-tone` es el del post.
- [x] Documentar la excepción de animación en `constitution/tech-stack.md` y en `diseno/direccion-visual.md`.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

_Al tocar los temas editoriales o la paleta._

- [ ] Si se añade o quita un tema en `src/data/temas.ts`, actualizar `TOKENS` y `PESOS` en `GrafoCerebral.astro`: son listas paralelas y el grafo no se entera solo.
- [ ] Si un token de tono deja de ser un color plano, comprobar que el grafo lo sigue resolviendo y no cae al respaldo.
- [ ] Al cambiar un tono, mirar una coma sobre papel crema: el criterio es que se vea, no que sea del color exacto.
