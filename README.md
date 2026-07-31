# blog-personal

Blog personal de Camilo Moreno. Posts largos en español sobre educación, filosofía, corrección de estilo y oficio docente.

**Stack:** Astro 5 (estático) + TypeScript estricto + pnpm. Despliegue en Hostinger.

## Estructura

```
blog-personal/
├── spec/                   ← documentación spec-driven (constitución + features)
│   ├── constitution/       ← mission.md, tech-stack.md, roadmap.md
│   ├── features/           ← una carpeta por feature (spec.md, plan.md, tasks.md)
│   ├── backlog/            ← ideas sin priorizar
│   ├── archive/            ← features absorbidas o finalizadas
│   ├── diseno/             ← índice del material de referencia visual
│   ├── bitacora.md         ← entradas por sesión de trabajo
│   └── deuda-tecnica.md    ← atajos registrados a propósito
├── referente-de-diseno/    ← material de referencia heredado (no es parte del blog)
└── [src/, public/, ...]    ← código del blog, por crear en feature 000
```

## Estado actual

- **Feature 000** (proyecto base) — propuesta, sin implementar.
- **Feature 001** (sistema de posts) — propuesta, depende de la 000.

El estado detallado de cada feature está en [`spec/constitution/roadmap.md`](spec/constitution/roadmap.md).

## Comandos

Una vez implementada la feature 000:

- `pnpm install` — instala dependencias.
- `pnpm dev` — servidor local en `http://localhost:4321`.
- `pnpm build` — genera el sitio estático en `dist/`.
- `pnpm preview` — sirve `dist/` localmente.
- `pnpm lint` — corre ESLint.
- `pnpm astro check` — validación de tipos.

## Documentación

- `spec/constitution/mission.md` — qué es el blog y para quién.
- `spec/constitution/tech-stack.md` — stack, convenciones y límites.
- `spec/constitution/roadmap.md` — orden de las features.
- `spec/features/NNN-…/spec.md` — qué hace cada feature.
- `spec/features/NNN-…/plan.md` — cómo se implementa.
- `spec/bitacora.md` — registro de sesiones de trabajo.

## Prerrequisitos

- Node 22 LTS.
- pnpm (`npm install -g pnpm`).
- Git configurado para `github.com/Riskbreaker2077/blog-personal`.

## Origen

Creado el 31 de julio de 2026. El referente de diseño (`referente-de-diseno/`) viene de un ZIP entregado por Camilo con un prototipo visual previo y un esqueleto Astro. Se conservó como consulta, no como base de copia.
