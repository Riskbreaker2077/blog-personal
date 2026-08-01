# Bitácora

_Una entrada por sesión de trabajo. Entradas nuevas arriba. Sin prosa de relleno: qué se hizo, qué quedó pendiente, qué decisiones se tomaron._

## 2026-07-31 · Sesión 4 — Adopción del prototipo de Claude Design

**Qué se hizo**

- Importación del proyecto de Claude Design `Blog.Personal` (`8ec993c7-4de0-4fbc-a43a-4f97925213bf`) vía MCP: lectura de `Blog.html`, `app.jsx`, `data.js`, `screens.jsx`, `image-slot.js` y `tweaks-panel.jsx`.
- Re-maquetación completa de la capa visual sobre el Astro existente: `src/styles/global.css`, `BaseLayout`, `Topbar`, `Footer`, portada y “Sobre”.
- Nueva página `/archivo/` con estado vacío útil y los temas previstos.
- Nuevo módulo `src/data/temas.ts` con temas, tonos y entradas anunciadas.
- Modo oscuro con `data-theme`, botón en la navegación, script inline antiparpadeo y persistencia en `localStorage`.
- Actualización de `spec/diseno/direccion-visual.md`, `spec/constitution/tech-stack.md` y el roadmap.

**Pendiente**

- Verificar `pnpm build` y `pnpm astro check` desde Windows: `node_modules/` se instaló con pnpm de Windows y falta `@rollup/rollup-linux-x64-gnu`, así que desde WSL solo corre ESLint.
- Fila de filtros de la portada: entra en la feature 002, cuando existan las páginas de tema.
- Retrato e ilustración: los marcos quedan como marcadores de posición.

**Decisiones**

- El prototipo de Claude Design manda sobre la paleta magenta/berenjena anterior; la doc se actualizó para reflejarlo, no al revés.
- Modo oscuro sale del backlog y pasa a ser parte del producto.
- No se portan los posts de ficción del prototipo: el contenido real llega con la feature 001. `src/content/` sigue sin tocarse.
- Del prototipo se descartan el panel de tweaks, el cursor personalizado, la marginalia, el control de densidad y React sobre CDN.

## 2026-07-31 · Sesión 3 — Implementación del fundamento visual y técnico

**Qué se hizo**

- Inicialización de Astro 5.18.2 con TypeScript estricto, pnpm y ESLint.
- Implementación limpia de `BaseLayout`, navegación, footer, portada y página “Sobre”.
- Creación del sistema de tokens, favicon y firma visual “línea del pensamiento”.
- Configuración de Newsreader e IBM Plex Mono autoalojadas.
- Incorporación de skip link, foco visible, HTML semántico, responsive desde 360 px y `prefers-reduced-motion`.
- Validación visual en escritorio y móvil, sin desbordamiento horizontal ni errores de consola.
- Ejecución satisfactoria de lint, comprobación de tipos y build estático.
- Confirmación de que `referente-de-diseno/` no aparece en `dist/`.

**Pendiente**

- Revisión visual de Camilo.
- Implementar la feature 001: núcleo editorial publicable.
- Sustituir la biografía y el retrato provisionales antes del despliegue.
- Confirmar el dominio canónico antes de las features 003/004.

**Decisiones**

- IBM Plex Mono es la monoespaciada definitiva.
- Las fuentes se alojan dentro del build para evitar dependencias remotas.
- El horizonte geométrico acompaña la línea del pensamiento como único acento retrofuturista fuerte.
- El entorno local actual usa Node 20.18.0, compatible con Astro; Node 22 LTS sigue siendo la recomendación del proyecto.

## 2026-07-31 · Sesión 2 — Revisión de alcance y dirección visual

**Qué se hizo**

- Auditoría de constitución, roadmap, features y referente de diseño.
- Corrección del roadmap: la feature 000 no estaba implementada.
- Adopción de la Content Layer moderna de Astro 5 en lugar de la API heredada.
- Eliminación del supuesto `vite.exclude`; el referente se mantiene versionado y producción no lo importa ni copia.
- Definición de la dirección “archivo editorial sereno + acentos retrofuturistas”.
- Elección de la “línea del pensamiento” como firma visual.
- Replanteamiento del roadmap en features 000–004.
- Actualización de README, constitución y documentación de diseño.

**Pendiente**

- Implementar la feature 000.
- Elegir la versión 5.x exacta de Astro al inicializar.
- Resolver la carga final de Newsreader y la monoespaciada.
- Confirmar el dominio antes de la feature 003/004.

**Decisiones**

- Astro permanece en major 5 y se fijará exactamente.
- Temas: Filosofía, Educación, Mundo editorial, Inteligencia artificial y General.
- Educación incluye el oficio docente; no son temas separados.
- Licencia del contenido: CC BY-NC 4.0.
- Las imágenes retrofuturistas del referente definen atmósfera, pero no se publican sin licencia verificable.

## 2026-07-31 · Sesión 1 — Inicio del proyecto

> Las decisiones de taxonomía y roadmap de esta entrada fueron reemplazadas por la sesión 2.

**Qué se hizo**

- Creación del repo `blog-personal` en GitHub (público) y de la carpeta local en `C:\Users\camil\Desktop\Desarrollo\blog-personal\` con `git init` y primer commit.
- Importación del material de `Blog.Personal.zip` (prototipo visual + base Astro) a `referente-de-diseno/`, eliminando una imagen duplicada bit-exact y omitiendo los posts de prueba.
- Definición de la estructura spec-driven del proyecto, alineada con la convención de `portal-estudiantes/`.
- Redacción de la constitución (`mission.md`, `tech-stack.md`, `roadmap.md`) con valores reales del blog.
- Creación de las features 000 (proyecto base) y 001 (sistema de posts) con `spec.md`, `plan.md` y `tasks.md` cada una.
- Commit y push inicial de toda la estructura al remoto.

**Pendiente**

- Implementar la feature 000 (ejecutar `pnpm create astro@latest`, configurar el proyecto, post de prueba).
- Decidir el subdominio real del blog en Hostinger (placeholder actual: `https://blog.camilomoreno.co`).
- Resolver la elección del subdominio antes de la primera subida a producción.

**Decisiones**

- Stack: Astro 5 + TypeScript estricto + pnpm. Sin Tailwind, sin MDX en la 000.
- Deploy: Hostinger (confirmado por Camilo).
- Tema del blog: posts largos en español, archivo cronológico, sin CMS, sin analítica invasiva.
- Temas cerrados: cinco valores (`educacion`, `filosofia`, `correccion`, `oficio-docente`, `general`).
- El referente `referente-de-diseno/` queda como consulta, **no se fusiona** con `src/`.
- **`referente-de-diseno/` SÍ se queda en el repo** como archivo histórico y base de trabajo gráfico. La exclusión del build de Astro se hará vía `astro.config.mjs` en la feature 000, no vía `.gitignore`. (Decisión tomada al cierre de la sesión, después de discutir el alcance.)
