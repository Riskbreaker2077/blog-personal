# blog-personal

Blog personal de Camilo Moreno: pensamiento largo en español sobre filosofía, educación, mundo editorial e inteligencia artificial.

## Identidad

El proyecto combina un **archivo editorial sereno** con **acentos retrofuturistas**. La lectura es la prioridad; la línea cronológica —la “línea del pensamiento”— organiza el archivo y funciona como firma visual.

La dirección aprobada está en [`spec/diseno/direccion-visual.md`](spec/diseno/direccion-visual.md). El material heredado de `referente-de-diseno/` se conserva como consulta, no se copia a producción y no forma parte del build.

## Stack decidido

- Astro 5.x fijado a una versión exacta.
- TypeScript estricto.
- Content Layer con posts Markdown.
- pnpm.
- CSS plano.
- Sitio completamente estático.
- Despliegue previsto en Hostinger.

## Estado

La base visual y el núcleo editorial ya están implementados; falta publicar el primer texto real.

1. **000 · Fundamento visual y técnico** — implementada.
2. **001 · Núcleo editorial publicable** — implementada salvo el primer texto real.
3. **002 · Índice, archivo y temas** — siguiente.
4. **003 · Distribución e indexación** — propuesta.
5. **004 · Despliegue en Hostinger** — propuesta.

Consulta el detalle en [`spec/constitution/roadmap.md`](spec/constitution/roadmap.md).

## Temas editoriales

- Filosofía.
- Educación, incluido el oficio docente.
- Mundo editorial.
- Inteligencia artificial.
- General.

## Comandos

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm lint`
- `pnpm astro check`

## Estructura actual

```text
src/
├── components/         navegación y footer
├── content/posts/      posts en Markdown
├── data/               temas editoriales y sus tonos
├── layouts/            layout raíz y layout de lectura
├── lib/                helpers de posts, fechas y tiempo de lectura
├── pages/              índice, archivo, «Sobre» y la ruta /posts/<id>/
└── styles/             tokens y estilos globales

public/                 assets estáticos
spec/                   constitución, diseño, features y bitácora
referente-de-diseno/    archivo histórico; fuera del build
```

## Escribir un post

1. Crea `src/content/posts/nombre-legible.md`.
2. Frontmatter mínimo: `title`, `description`, `pubDate` (`AAAA-MM-DD`) y `topic`.
3. Opcionales: `updatedDate`, `cover` (con `alt` obligatorio), `epigraph` (con `text` y `source` opcional) y `draft: true`.
4. Un borrador se ve en `pnpm dev` y no genera HTML en producción.

## Principios

- El texto es el producto.
- Escribir un post debe requerir solo Markdown y un commit.
- Archivo antes que algoritmo.
- Sin CMS, base de datos, login ni analítica invasiva.
- La licencia del contenido es **CC BY-NC 4.0**.

## Prerrequisitos previstos

- Node 22 LTS.
- pnpm.
- Git.
