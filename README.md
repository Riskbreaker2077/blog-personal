# blog-personal

Blog personal de Camilo Moreno: pensamiento largo en español sobre filosofía, educación, mundo editorial e inteligencia artificial.

**En línea: [blog.morenocaro.com](https://blog.morenocaro.com)** · [feed RSS](https://blog.morenocaro.com/rss.xml)

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

**El blog está publicado desde el 2 de agosto de 2026.** Las cinco features del roadmap inicial están implementadas.

1. **000 · Fundamento visual y técnico** — implementada.
2. **001 · Núcleo editorial publicable** — implementada.
3. **002 · Índice, archivo y temas** — implementada.
4. **003 · Distribución e indexación** — implementada.
5. **004 · Despliegue en Hostinger** — implementada; el sitio está en línea.

Escribir ya solo requiere un `.md`, un commit y tres comandos.

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

**Desde WSL no funcionan directamente.** `node_modules` tiene binarios de Windows, así que Astro hay que lanzarlo con el Node de Windows:

```bash
cmd.exe /c "node_modules\.bin\astro.cmd dev"
```

Lo cómodo es abrir PowerShell en la carpeta del proyecto y usar `npm run dev` ahí. Si ves `Cannot find module @rollup/rollup-linux-x64-gnu`, es esto y no un fallo del código. Detalle en [`spec/constitution/tech-stack.md`](spec/constitution/tech-stack.md).

## Estructura actual

```text
src/
├── components/         navegación, footer, cronología, filtro de temas y grafo de portada
├── content/posts/      posts en Markdown
├── data/               temas editoriales e identidad del sitio
├── layouts/            layout raíz y layout de lectura
├── lib/                helpers de posts y el plugin de puntuación
├── pages/              índice, archivo, «Sobre», /temas/<tema>/, /posts/<id>/, /rss.xml y 404
└── styles/             tokens y estilos globales

public/                 assets estáticos, robots.txt, .htaccess, og.jpg y rss.xsl
spec/                   constitución, diseño, features y bitácora
referente-de-diseno/    archivo histórico; fuera del build
```

## Escribir un post

1. Crea `src/content/posts/nombre-legible.md`.
2. Frontmatter mínimo: `title`, `description`, `pubDate` (`AAAA-MM-DD`) y `topic`.
3. Opcionales: `updatedDate`, `cover` (con `alt` obligatorio), `epigraph` (con `text` y `source` opcional) y `draft: true`.
4. Un borrador se ve en `pnpm dev` y no genera HTML en producción.

## Publicar

El sitio se publica en `https://blog.morenocaro.com` subiendo **solo `dist/`** por SSH + `rsync`. El procedimiento, la verificación y el rollback están en [`spec/despliegue.md`](spec/despliegue.md). Nada se sube sin aprobación explícita.

Las credenciales no están en el repositorio: viven en `~/.ssh/config` de la máquina, detrás del alias `hostinger-blog`.

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
