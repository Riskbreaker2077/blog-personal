# 001 · Núcleo editorial publicable — Plan

## Implementación

1. Crear `src/content.config.ts` con `glob()` para `src/content/posts/**/*.md`.
2. Definir el schema y exportar los valores temáticos desde un módulo compartido.
3. Crear helpers para publicados, borradores, orden y tiempo de lectura.
4. Crear `PostLayout.astro`.
5. Crear `src/pages/posts/[...id].astro` con rutas estáticas.
6. Incluir borradores solo cuando el entorno sea desarrollo.
7. Añadir portada opcional con texto alternativo requerido cuando exista.
8. Implementar navegación anterior/siguiente.
9. Probar el layout con un texto real de extensión representativa.
10. Validar que `dist/` no contenga rutas de borrador.

## Decisiones

- Markdown plano; sin MDX.
- `description` y `topic` son obligatorios.
- `general` es una decisión editorial explícita, no un valor implícito.
- El tiempo de lectura usa segmentación compatible con texto español y documenta su aproximación.
- Las fechas se modelan como fechas civiles para evitar desplazamientos por zona horaria.

## Riesgos

- **Compatibilidad de Astro 5:** no se usa la API heredada `src/content/config.ts`.
- **Fuga de borradores:** se valida tanto listados como archivos generados.
- **Imagen sin derechos o sin alt:** la portada es opcional y se valida editorialmente.
