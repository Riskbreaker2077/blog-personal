# Deuda técnica

_Lista de compromisos, atajos y cosas pendientes que se sabe que hay que pagar después. No es un TODO activo: es un registro de lo que se pospone a propósito._

## Pendiente

### Instalación con pnpm 10 sobre un proyecto que pinea pnpm 11

- **Fecha** — 1 de agosto de 2026.
- **Origen** — feature 003, al instalar `@astrojs/rss` y `@astrojs/sitemap`.
- **Síntoma** — `package.json` declara `packageManager: pnpm@11.9.0`, que exige Node ≥ 22.13 por `node:sqlite`. El Node de Windows es 20.18.0 y no hay `pnpm` en su PATH, así que la instalación se hizo con `pnpm@10.20.0` vía `npx` y `--config.manage-package-manager-versions=false`. Eso reconstruyó `node_modules` desde el store v10 y dejó de ejecutar los scripts de build de `esbuild` y `sharp`, porque pnpm 10 no entiende la clave `allowBuilds` de `pnpm-workspace.yaml` (su equivalente es `onlyBuiltDependencies`). El build, el check y el lint pasan igual.
- **Mitigación prevista** — subir el Node de Windows a 22 LTS (o 24) y volver a instalar con el pnpm pineado. Se revisa al preparar la 004, que es donde el entorno de build importa de verdad.
- **Severidad** — media: no rompe nada hoy, pero cualquiera que clone el repo con otro Node verá un árbol distinto.

### Código en producción sin carpeta de feature

- **Fecha** — 2 de agosto de 2026.
- **Origen** — sesión 10: grafo de portada y puntuación por tema.
- **Síntoma** — `src/components/GrafoCerebral.astro` y `src/lib/rehype-puntuacion.mjs` están publicados sin `spec.md`, `plan.md` ni `tasks.md`. Contradice la primera regla dura de `CLAUDE.md`, que exige la carpeta antes de tocar el código de una feature.
- **Mitigación prevista** — crear `spec/features/005-ilustracion-y-puntuacion/` a posteriori, o absorber ambos en la 000 si se consideran acabado visual. Decisión de Camilo; preguntada tres veces en la sesión sin respuesta.
- **Severidad** — media: el código funciona y está documentado en la bitácora y en la dirección visual, pero el proyecto pierde su garantía de trazabilidad.

### La imagen social obliga a mantener una atribución

- **Fecha** — 2 de agosto de 2026.
- **Origen** — sesión 10.
- **Síntoma** — `public/og.jpg` es CC BY-SA 4.0 de Bernard Gagnon. Exige crédito visible, que hoy vive en `/sobre/`. Si alguien cambia la foto y olvida el crédito, o rediseña `/sobre/` y se lo lleva por delante, el sitio queda en incumplimiento de licencia.
- **Mitigación prevista** — sustituirla por una imagen propia, que elimina la obligación. Mientras tanto, los datos están centralizados en `SITIO.creditoImagenSocial` para que el crédito no se pueda desincronizar de la foto.
- **Severidad** — baja, pero legal y no técnica: no se detecta con un build.

## Resuelta

### Imagen social sin crear

- **Abierta** el 1 de agosto de 2026 (feature 003); **resuelta** el 2 de agosto de 2026.
- `og:image` apuntaba a `/og.png`, que no existía. Se resolvió con una foto del Valle de Cocora recortada a 1200×630 y servida como `/og.jpg` —JPEG y no PNG: una fotografía en PNG pesaría más de 1 MB sin verse mejor.

## Formato de entrada

Cuando se introduzca deuda, se documenta aquí con:

- **Fecha** — cuándo se introdujo.
- **Origen** — feature o tarea que la generó.
- **Síntoma** — qué se nota (build lento, código duplicado, schema flojo, etc.).
- **Mitigación prevista** — cómo se piensa pagar (en qué feature o sprint).
- **Severidad** — baja (cosmética) / media (mantenimiento) / alta (riesgo de bug o deuda de seguridad).
