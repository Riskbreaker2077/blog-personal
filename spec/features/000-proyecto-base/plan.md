# 000 · Proyecto base — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Inicializar un proyecto Astro 5 desde cero con el template "minimal" y construir encima lo mínimo necesario para validar la base. Sin integraciones extra en esta fase. Sin MDX todavía — el post de prueba va en `.md` plano.

Aprovechamos el esqueleto ya disponible en `referente-de-diseno/astro-base/` como **referencia visual y de estructura**, pero **no se copia directamente**: cada archivo se reescribe limpio y se aloja en la ubicación definitiva de la app, no en el referente. El referente queda como archivo de consulta.

## Implementación

_Pasos técnicos concretos, en orden. Indica los archivos/módulos que se tocan._

1. **Inicializar el proyecto Astro** — desde la raíz del repo, `pnpm create astro@latest . --template minimal --typescript strict --no-install --no-git --skip-houston`. Acepta TypeScript estricto, rechaza la instalación inicial (la hacemos manual), y desactiva el `git init` (ya estamos en un repo).
2. **Ajustar `package.json`** — fijar el nombre del paquete, scripts de `lint` (eslint con la config de Astro) y `astro check`.
3. **Configurar `astro.config.mjs`** — `site: 'https://blog.camilomoreno.co'` (o el subdominio que se decida; placeholder por ahora), `output: 'static'`, `integrations: []`.
4. **Crear `src/content/config.ts`** — definir la colección `posts` con el schema mínimo: `title` (string, requerido), `description` (string, opcional), `pubDate` (Date, requerido), `updatedDate` (Date, opcional), `topic` (enum, opcional), `draft` (boolean, default `false`).
5. **Crear `src/styles/global.css`** — reset ligero, variables CSS para colores y tipografía, una clase `.prose` para el cuerpo del post.
6. **Crear `src/layouts/BaseLayout.astro`** — `<head>` con metadatos básicos, link a `global.css`, slot de contenido. Acepta props `title` y `description`.
7. **Crear `src/components/Topbar.astro`** — navegación horizontal con dos enlaces: `/` y `/sobre`.
8. **Crear `src/pages/index.astro`** — usa `BaseLayout`, importa el primer post desde la colección, muestra título + fecha + descripción + un párrafo de adelanto.
9. **Crear `src/pages/sobre.astro`** — texto provisional de una o dos frases.
10. **Crear `src/content/posts/hola-mundo.md`** — post de prueba con frontmatter completo y un par de párrafos de Lorem Ipsum en español.
11. **Reemplazar el `README.md` raíz** — por una versión real con secciones de stack, comandos, estructura y enlace a `spec/`.
12. **Reforzar `.gitignore`** — añadir `.astro/`, `dist/`, `node_modules/`, `*.log`, `.env*`. **No** ignorar `referente-de-diseno/` porque ese material sí vive en el repo como archivo histórico; la exclusión del build se hace en `astro.config.mjs` (ver decisión más abajo).
13. **Configurar Astro para excluir `referente-de-diseno/` del build** — añadir `referente-de-diseno/` a la opción `exclude` de `vite` (o equivalente) en `astro.config.mjs` para que el build no procese esa carpeta.

## Decisiones

_Elecciones de diseño relevantes y su justificación. Alternativas descartadas y por qué._

- **`output: 'static'`** — la constitución dice "estático, sin servidor" y el caso de uso no necesita SSR. Markdown prerenderizado es el camino de menor fricción.
- **Sin MDX en esta feature** — MDX añade complejidad (componentes dentro de Markdown, build más lento) y no hay un post que lo justifique todavía. Se introduce en la 001 si aparece la necesidad.
- **Sin Tailwind** — la constitución es explícita: "CSS plano hasta nuevo aviso". `global.css` con variables basta para una base legible.
- **pnpm en vez de npm** — más rápido, mejor caché, menos espacio en disco. Si surge fricción con algún paquete que solo publica en npm registry, se reconsidera.
- **Tipografía del sistema para la UI, una serif para el cuerpo** — reduce peticiones de fuentes, mejor rendimiento, y la serif da al texto largo la cadencia que pide la constitución ("el texto es el producto"). La serif concreta se decide en la implementación mirando opciones del sistema antes de cargar una webfont.

## Riesgos

_Qué puede salir mal o requerir cuidado, y cómo se mitiga._

- **Astro 5 todavía en evolución** — alguna API puede cambiar entre releases. Mitigación: fijar versión exacta en `package.json` (`"astro": "5.x.y"`) en vez de `^5.0.0`.
- **El `.gitignore` por defecto del template no excluye `referente-de-diseno/`** — y por convención del proyecto, ese material sí vive en el repo. La exclusión debe hacerse en la config de Astro, no en git. Mitigación: configurar `vite.exclude` o equivalente en `astro.config.mjs` y verificar con `pnpm build` que no se cuela.
- **Primera ejecución lenta de `pnpm install`** en Windows/WSL — esperable. No es un bug, se documenta en el README.
- **Tipografía de sistema diferente entre Linux, Mac y Windows** — la lectura en local puede variar. Mitigación: aceptar la variabilidad como parte del "no perfect, just good enough" de esta feature; en la 001 se evalúa introducir una webfont de respaldo.
