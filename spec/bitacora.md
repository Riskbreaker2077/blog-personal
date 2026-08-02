# Bitácora

_Una entrada por sesión de trabajo. Entradas nuevas arriba. Sin prosa de relleno: qué se hizo, qué quedó pendiente, qué decisiones se tomaron._

## 2026-08-02 · Sesión 10 — El sitio sale a producción

**Qué se hizo**

_Ilustración de portada._ El hueco del hero deja de ser un marcador de posición: lo ocupa `src/components/GrafoCerebral.astro`, un grafo animado en canvas. Llegó como componente suelto en `grafo/outputs/` y se reescribió para el proyecto:

- Componente de Astro en vez de archivos en `public/`, para que Astro lo empaquete y solo se descargue donde se usa.
- La paleta se lee de los tonos de tema (`--tone-accent`, `--tone-gold`, `--tone-peri`, `--tone-ink`, `--tone-muted`) con `getComputedStyle`, no escrita en el componente. Cada nodo es un tema editorial y el grafo sigue al tema claro/oscuro por un `MutationObserver` sobre `data-theme`.
- `touch-action: pan-y` e interacción solo con ratón: el original usaba `touch-action: none` y en móvil el dedo no podía desplazar la portada.
- El bucle se detiene fuera de pantalla (`IntersectionObserver`) y con `prefers-reduced-motion` dibuja un solo cuadro.
- Sin marco ni pie. Se desborda hacia el texto y una máscara radial disuelve los bordes. Oculto bajo 47.5rem.

_Puntuación por tema._ `src/lib/rehype-puntuacion.mjs`, plugin propio sin dependencias, envuelve los signos en `<span class="punct">` en tiempo de build. `PostLayout` los tiñe con el tono del post mezclado con la tinta al 70%.

_Contenido._ Hero nuevo, línea de metadatos fuera, «Sobre» reescrita en tercera persona sin el hueco del retrato, bloque de redes (GitHub, Academia.edu, ORCID, LinkedIn), 2021 → 2026 en el pie y fuera el contador de entradas por año.

_Imagen social._ Foto del Valle de Cocora de Bernard Gagnon (Wikimedia Commons), recortada a 1200×630 y servida como `/og.jpg`.

_Despliegue (feature 004)._ El sitio está en línea en `https://blog.morenocaro.com`. El proceso real, en orden:

1. `~/.ssh/config` con el alias `hostinger-blog`. Apareció un obstáculo tonto: `~/.ssh/config` existía como **carpeta vacía**, así que ningún intento de escribir el archivo funcionaba. `rmdir` y a otra cosa.
2. `ssh hostinger-blog "ls -d ~/domains/*/public_html"` — la cuenta aloja cuatro dominios; el del blog es `~/domains/blog.morenocaro.com/public_html`, que solo tenía el `default.php` de bienvenida.
3. Cuatro commits antes de publicar, para tener a dónde volver.
4. `rsync -avzn` de simulacro: 29 archivos, un solo borrado (`default.php`), ningún otro dominio tocado.
5. `rsync -avz --delete --backup-dir` de verdad. 473 KB enviados.
6. Verificación por `curl`: diez rutas en 200, `http` → `https` en 301, 404 propia con `noindex`, canonical con barra final, RSS con enlaces absolutos, `og.jpg` sirviéndose y `max-age=31536000, immutable` en `/_astro/` —el `.htaccess` se aplicó.

_RSS legible._ Tras publicar, el feed «no funcionaba»: era válido, pero el navegador enseñaba XML crudo. Se añadió `public/rss.xsl` y `stylesheet: "/rss.xsl"` en `rss.xml.ts`. Los lectores de feeds la ignoran.

**Verificación**

- ESLint limpio. `astro check`: 0 errores, 0 avisos, 0 hints. Build de 10 páginas.
- Producción comprobada con `curl` ruta por ruta (ver arriba).

**Pendiente**

- Decidir qué pasa con `grafo/` en la raíz: el componente ya vive en `src/`, así que la carpeta sobra.
- Decidir si el grafo y la puntuación se formalizan como feature 005 o se absorben en la 000. Preguntado tres veces, sin respuesta todavía.
- Republicar para que `rss.xsl` llegue al servidor.
- Revisar el sitio en vivo en móvil y en modo oscuro.

**Decisiones**

- El grafo es una excepción consciente a «sin animaciones innecesarias»: es la ilustración de la portada, no un adorno sobre el contenido. Queda anotada en la dirección visual.
- La foto social es CC BY-SA 4.0. La atribución es obligatoria y va en `/sobre/`, con los datos en `SITIO.creditoImagenSocial`. El recorte hereda esa licencia; no afecta a los textos, que siguen CC BY-NC 4.0.
- El host, el usuario y el puerto **no entran al repositorio**. Viven en `~/.ssh/config` detrás del alias `hostinger-blog`, que es lo único que aparece en la documentación.
- La puntuación se tiñe mezclada con la tinta, no a color pleno: el oro puro sobre papel crema dejaba comas invisibles y una coma que no se ve cambia cómo se lee la frase.

## 2026-08-01 · Sesión 9 — Preparación del despliegue (feature 004)

**Qué se hizo**

- Confirmado el destino: subdominio `blog.morenocaro.com` ya creado en Hostinger; la subida será por SSH + `rsync` desde WSL.
- `astro.config.mjs`: `build.format: "directory"` y `trailingSlash: "always"` explícitos. Era el comportamiento por defecto; queda escrito para que nadie genere dos URLs del mismo texto.
- `public/.htaccess`: `ErrorDocument 404`, `Options -Indexes`, caché inmutable para `/_astro/` (los assets llevan hash), revalidación del HTML, una hora para el XML, `nosniff` y `Referrer-Policy`. Se copia solo a `dist/`.
- `spec/despliegue.md`: runbook completo —credenciales fuera del repo, ruta remota, simulacro con `rsync -n`, publicación con `--delete` y `--backup-dir`, verificación por `curl` y rollback.
- Auditoría de `dist/`: 26 archivos, 460 KB. Sin borradores, sin `referente-de-diseno/`, sin credenciales, sin URLs de localhost.

**Verificación**

- Build limpio tras `rm -rf dist`: 10 páginas, `.htaccess` incluido. ESLint limpio. `astro check`: 0 errores, 0 avisos, 0 hints.

**Pendiente**

- **La publicación en sí.** La feature exige aprobación explícita de Camilo y las credenciales no están en el repo: los tres comandos los ejecuta él.
- Verificar HTTPS, rutas, RSS, sitemap, canonical y 404 contra el dominio real, después de publicar.
- `public/og.png` sigue sin crearse (viene de la 003).

**Decisiones**

- HTTPS no se fuerza por `.htaccess` sino con el interruptor de hPanel: duplicar la redirección detrás del proxy de Hostinger es la receta del bucle infinito.
- `rsync --delete` con `--exclude '.well-known/'`: el borrado remoto es lo que impide que sobrevivan páginas de versiones viejas, pero la validación de certificados no se toca.
- Cada publicación deja lo reemplazado en `backup-AAAAMMDD-HHMM/`. El rollback es un `rsync` a la inversa, no un misterio.

## 2026-08-01 · Sesión 8 — Distribución e indexación (feature 003)

**Qué se hizo**

- URL canónica confirmada y cambiada: `https://blog.morenocaro.com` en `astro.config.mjs`. El placeholder anterior era `blog.camilomoreno.co`.
- `src/data/sitio.ts`: nombre, autor, locale, imagen social y licencia en un solo sitio, para que `<head>`, RSS y datos estructurados no se contradigan.
- `BaseLayout.astro` ampliado: canonical, Open Graph, Twitter Card, `article:*` en posts, `<link rel=alternate>` al feed y un hueco para JSON-LD. Nueva prop `noindex` para páginas que no son destino.
- `PostLayout.astro` emite `BlogPosting` con autor, fechas civiles, sección, idioma y licencia.
- `src/pages/rss.xml.ts` con `@astrojs/rss`: solo publicados, URLs absolutas, `dc:creator` en vez de `<author>` (RSS 2.0 exige un correo ahí) y `pubDate` a mediodía UTC para que la fecha civil no se corra de día.
- `@astrojs/sitemap` con la 404 filtrada, `public/robots.txt` apuntando al sitemap y `src/pages/404.astro` con salidas al índice y al archivo.
- Enlace visible al feed en el pie.

**Verificación**

- Build: 10 páginas + `rss.xml` + `sitemap-index.xml`. El feed trae un solo ítem, con URL absoluta y `Sat, 01 Aug 2026 12:00:00 GMT`. El sitemap lista las 9 rutas públicas y omite la 404. La 404 sale con `noindex, follow` y sin canonical.
- ESLint limpio. `astro check`: 0 errores, 0 avisos, 0 hints sobre 21 archivos.

**Pendiente**

- `public/og.png` (1200×630): lo hace Camilo. Hasta entonces las tarjetas al compartir salen sin imagen.
- Que Hostinger sirva `404.html` como página de error es configuración del hosting: va en la 004.

**Decisiones**

- Dos dependencias nuevas, ambas oficiales y fijadas a versión exacta: `@astrojs/rss` 4.0.19 y `@astrojs/sitemap` 3.7.3.
- El feed filtra borradores por su cuenta en vez de confiar en `obtenerPosts`: en desarrollo esa función sí los deja pasar, y un feed no se puede recoger.
- La 404 no lleva canonical: una página de error no es la versión buena de nada.

**Fricción del entorno** — el pin `pnpm@11.9.0` no corre con el Node 20.18 de Windows. La instalación se hizo con pnpm 10 vía `npx`; queda anotado en `spec/deuda-tecnica.md`.

## 2026-08-01 · Sesión 7 — Índice, archivo y temas (feature 002)

**Qué se hizo**

- `src/lib/posts.ts`: `agruparPorAnio`, `filtrarPorTema` y `contarEntradas`. El año sale de la cadena `AAAA-MM-DD`, nunca de un `Date`.
- `Cronologia.astro`: la línea del pensamiento como componente, compartida por el índice y las páginas de tema. La fila entera es zona de clic mediante un enlace estirado sobre el título; no hay JavaScript.
- `FiltroTemas.astro`: la fila de filtros del prototipo convertida en enlaces reales a `/temas/<tema>/`, con `aria-current="page"` en el activo.
- Índice reescrito con posts reales: máximo cinco recientes, agrupados por año, y cierre que enlaza al archivo cuando hay más.
- `/archivo/` completo, agrupado por año, en la lista compacta del prototipo (fecha, título, tema).
- `/temas/<tema>/` para los cinco temas, con encabezado, descripción y estado vacío propio.
- `src/data/temas.ts`: fuera `ENTRADAS_ANUNCIADAS`; cada tema gana una `descripcion` de una línea que alimenta la página y su `<meta name="description">`.

**Verificación**

- Build con siete fixtures de 2023 a 2026 y varios temas: el índice corta en cinco y agrupa 2026/2025/2024; el archivo lista los siete; `31 dic` y `01 ene` se quedan en su año. Fixtures borradas después.
- Borrador de prueba: ausente de índice, archivo, tema y `dist/`.
- ESLint limpio. `astro check`: 0 errores, 0 avisos, 0 hints sobre 18 archivos. Build final: 9 páginas.

**Pendiente**

- La 003 (RSS, sitemap, metadatos sociales, 404) es la siguiente.

**Decisiones**

- Los filtros no son estado de cliente sino URLs: cada tema tiene su página estática, indexable y compartible. Es lo que permite que funcionen sin JavaScript.
- El índice muestra cinco y delega el resto al archivo: la portada es una invitación, no un listado completo.
- La descripción de cada tema vive en `src/data/temas.ts` y no en el contenido: es interfaz, no texto editorial.

## 2026-08-01 · Sesión 6 — Epígrafe y primer texto real (cierre de la 001)

**Qué se hizo**

- Campo `epigraph` opcional (`text` requerido, `source` opcional) en el schema, renderizado en `PostLayout.astro` antes del cuerpo y documentado en `tech-stack.md` y `README.md`. Se distingue de la cita destacada, que sigue siendo `>` en el Markdown.
- Primer texto editorial real: `src/content/posts/las-maquinas-de-escribir.md` («Las máquinas de escribir», tema `filosofia`, publicado). Transcrito desde `Las máquinas de escribir_260801.docx`.
- Cerrados los dos criterios abiertos de la 001; feature marcada como implementada en `spec.md`, `tasks.md` y roadmap.

**Verificación**

- ESLint: limpio. `astro check`: 0 errores, 0 avisos, 0 hints sobre 15 archivos.
- Build: 4 páginas. `dist/posts/las-maquinas-de-escribir/index.html` con epígrafe y los dos enlaces a ciudadseva. El borrador de maquetación sigue sin generar HTML.

**Pendiente**

- Portada y archivo siguen mostrando `ENTRADAS_ANUNCIADAS`: el texto real solo es alcanzable por su URL directa hasta la feature 002.

**Decisiones**

- El epígrafe es metadato, no cuerpo: va en el frontmatter para que el layout lo componga alineado a la derecha y no compita con la primera línea del texto.
- Las dos URLs sueltas bajo «Referencias» en el `.docx` se convirtieron en enlaces dentro del cuerpo, en la mención de cada obra. No hay sección de referencias.
- La transcripción corrige solo ortografía inequívoca y artefactos de Word; no se toca el estilo del autor.

## 2026-07-31 · Sesión 5 — Núcleo editorial publicable (feature 001)

**Qué se hizo**

- `src/content.config.ts` con loader `glob()` y schema estricto: `title`, `description`, `pubDate`, `updatedDate`, `topic`, `draft` y `cover` con `alt` obligatorio.
- `src/lib/posts.ts` con el filtro único de publicados vs. borradores, orden cronológico, formato de fechas y tiempo de lectura.
- `PostLayout.astro` portado del `PostScreen` del prototipo: cintillo con píldora de tema, título, bajada, portada opcional, capitular, calderón en los `h2`, citas destacadas y pie con anterior/siguiente.
- Ruta `src/pages/posts/[...id].astro`.
- Borrador técnico `prueba-de-maquetacion.md` para validar Markdown representativo.
- Documentación al día: `tech-stack.md`, `README.md` (incluida la guía «Escribir un post»), roadmap y tareas de la 001.

**Verificación**

- Build con el borrador publicado temporalmente: la ruta se genera, la fecha civil sale correcta (`31 de julio de 2026`, sin desplazamiento por zona horaria), el tiempo de lectura calcula 2 min y el Markdown completo se renderiza.
- Build con el borrador restaurado: 3 páginas, ninguna ruta bajo `dist/posts/`.
- `astro check`: 0 errores, 0 avisos. ESLint: limpio.

**Pendiente**

- **Primer texto editorial real**: lo escribe Camilo. Hasta entonces el criterio «un texto real se publica en `/posts/<id>`» queda abierto y la 001 no se cierra del todo.
- Un post publicado todavía no aparece en portada ni en archivo: eso es la feature 002.

**Decisiones**

- Las fechas se modelan como cadena `AAAA-MM-DD`, no como `Date`: un `Date` desde `2026-07-31` es medianoche UTC y en Bogotá retrocede al día 30. El schema acepta la fecha con y sin comillas en YAML y normaliza.
- El tiempo de lectura es una aproximación declarada: 200 palabras por minuto sobre el texto sin sintaxis Markdown.
- La visibilidad de borradores se decide en un solo punto (`obtenerPosts`), para que listados y rutas no puedan divergir.

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
