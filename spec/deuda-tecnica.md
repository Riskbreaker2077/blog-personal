# Deuda técnica

_Lista de compromisos, atajos y cosas pendientes que se sabe que hay que pagar después. No es un TODO activo: es un registro de lo que se pospone a propósito._

## Pendiente

### Instalación con pnpm 10 sobre un proyecto que pinea pnpm 11

- **Fecha** — 1 de agosto de 2026.
- **Origen** — feature 003, al instalar `@astrojs/rss` y `@astrojs/sitemap`.
- **Síntoma** — `package.json` declara `packageManager: pnpm@11.9.0`, que exige Node ≥ 22.13 por `node:sqlite`. El Node de Windows es 20.18.0 y no hay `pnpm` en su PATH, así que la instalación se hizo con `pnpm@10.20.0` vía `npx` y `--config.manage-package-manager-versions=false`. Eso reconstruyó `node_modules` desde el store v10 y dejó de ejecutar los scripts de build de `esbuild` y `sharp`, porque pnpm 10 no entiende la clave `allowBuilds` de `pnpm-workspace.yaml` (su equivalente es `onlyBuiltDependencies`). El build, el check y el lint pasan igual.
- **Mitigación prevista** — subir el Node de Windows a 22 LTS (o 24) y volver a instalar con el pnpm pineado. Se revisa al preparar la 004, que es donde el entorno de build importa de verdad.
- **Severidad** — media: no rompe nada hoy, pero cualquiera que clone el repo con otro Node verá un árbol distinto.

### Imagen social sin crear

- **Fecha** — 1 de agosto de 2026.
- **Origen** — feature 003.
- **Síntoma** — `og:image` y `twitter:image` apuntan a `/og.png`, que todavía no existe. Al compartir un enlace, la tarjeta sale sin imagen.
- **Mitigación prevista** — Camilo crea el PNG de 1200×630 y lo deja en `public/og.png`. No hay que tocar código.
- **Severidad** — baja: cosmética y acotada a cómo se ve un enlace compartido.

## Resuelta

_Ninguna todavía._

## Formato de entrada

Cuando se introduzca deuda, se documenta aquí con:

- **Fecha** — cuándo se introdujo.
- **Origen** — feature o tarea que la generó.
- **Síntoma** — qué se nota (build lento, código duplicado, schema flojo, etc.).
- **Mitigación prevista** — cómo se piensa pagar (en qué feature o sprint).
- **Severidad** — baja (cosmética) / media (mantenimiento) / alta (riesgo de bug o deuda de seguridad).
