# Deuda técnica

_Lista de compromisos, atajos y cosas pendientes que se sabe que hay que pagar después. No es un TODO activo: es un registro de lo que se pospone a propósito._

## Pendiente

### La imagen social obliga a mantener una atribución

- **Fecha** — 2 de agosto de 2026.
- **Origen** — sesión 10.
- **Síntoma** — `public/og.jpg` es CC BY-SA 4.0 de Bernard Gagnon. Exige crédito visible, que hoy vive en `/sobre/`. Si alguien cambia la foto y olvida el crédito, o rediseña `/sobre/` y se lo lleva por delante, el sitio queda en incumplimiento de licencia.
- **Mitigación prevista** — sustituirla por una imagen propia, que elimina la obligación. Mientras tanto, los datos están centralizados en `SITIO.creditoImagenSocial` para que el crédito no se pueda desincronizar de la foto.
- **Severidad** — baja, pero legal y no técnica: no se detecta con un build.

## Resuelta

### Instalación con pnpm 10 sobre un proyecto que pinea pnpm 11

- **Abierta** el 1 de agosto de 2026 (feature 003); **resuelta** el 2 de agosto de 2026.
- `package.json` pinea `pnpm@11.9.0`, que exige Node ≥ 22.13 por `node:sqlite`. El Node de Windows era 20.18.0, así que la instalación se hizo con `pnpm@10.20.0` y se saltó los scripts de compilación de `esbuild` y `sharp`: pnpm 10 no entiende la clave `allowBuilds` de `pnpm-workspace.yaml`.
- **Cómo se cerró.** El paquete instalado era `OpenJS.NodeJS.20`, anclado a la línea 20: por eso `winget upgrade` no lo movía de major. Se instaló `OpenJS.NodeJS.LTS` —hoy 24.18.1— y se reinstaló desde cero con el pnpm pineado. Los scripts de `esbuild` y `sharp` se ejecutaron, y **el lockfile no cambió**: pnpm 11 resolvió el mismo árbol, así que la instalación vuelve a ser reproducible.

### Código en producción sin carpeta de feature

- **Abierta y resuelta** el 2 de agosto de 2026.
- El grafo y la puntuación estaban publicados sin `spec.md`, `plan.md` ni `tasks.md`, contra la primera regla dura de `CLAUDE.md`.
- Se cerró creando [`spec/features/005-ilustracion-y-puntuacion/`](features/005-ilustracion-y-puntuacion/spec.md). La `spec.md` abre con una nota de procedimiento: la carpeta se escribió después del código, y eso queda dicho.

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
