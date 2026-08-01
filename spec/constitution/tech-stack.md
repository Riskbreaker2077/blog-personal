# Tech stack y convenciones

_Cómo está construido el proyecto y las reglas que todo el código debe respetar. Es la referencia técnica que ningún plan de feature debería contradecir._

## Tecnologías

- **Lenguaje:** TypeScript estricto (Astro lo exige por defecto).
- **Framework:** Astro 5.x, fijado a una versión exacta en `package.json`, con Content Layer y posts en Markdown. La versión exacta se elige al implementar la feature 000 y no se actualiza de major sin modificar esta constitución.
- **Runtime / gestor de paquetes:** Node 22 LTS + pnpm (la elección de pnpm es por velocidad y por menor espacio en disco; se puede revisar si surge fricción).
- **Integraciones Astro:** `@astrojs/rss` y `@astrojs/sitemap`, ambas oficiales y fijadas a versión exacta. Cualquier otra se discute antes de instalarse.
- **Estilos:** CSS plano con variables CSS en `src/styles/global.css`. Sin Tailwind, sin frameworks de UI en esta primera fase.
- **Tipografía:** Newsreader para títulos y cuerpo; IBM Plex Mono o JetBrains Mono para metadatos. La monoespaciada final y la estrategia de carga se validan en la feature 000.
- **Despliegue:** Hostinger. El output de `astro build` se publica en el subdominio o subpath que defina el `site` en `astro.config.mjs`. La subida al hosting se hace por FTP/SSH desde WSL o desde el panel de Hostinger.
- **Tests:** No hay suite en esta primera fase. La validación es por build limpio + inspección visual local. Si crece, se evalúa Vitest.
- **Linter:** ESLint con la config recomendada de Astro. Ejecutar antes de cada commit.

## Archivos / módulos clave

_Mapa breve de dónde vive cada cosa. Solo lo que un recién llegado necesita para orientarse._

- `astro.config.mjs` — configuración de Astro. Define `site` (URL canónica), integraciones, y opciones de build.
- `src/content.config.ts` — configuración moderna de la Content Layer: loader local y schema de los posts.
- `src/content/posts/` — todos los posts en `.md`. Un archivo por post.
- `src/layouts/BaseLayout.astro` — layout raíz. Define `<head>`, metadatos, tipografía, contenedor.
- `src/pages/index.astro` — landing: lista de los posts más recientes.
- `src/pages/archivo.astro` — archivo cronológico completo.
- `src/pages/posts/[...id].astro` — ruta dinámica que renderiza un post desde su `id` (nombre del archivo).
- `src/pages/temas/[topic].astro` — una página por tema editorial: `/temas/<tema>/`.
- `src/pages/rss.xml.ts` — feed RSS. Solo posts publicados, con URLs absolutas.
- `src/pages/404.astro` — página de error, con `noindex`.
- `src/data/sitio.ts` — identidad del sitio para metadatos: nombre, autor, locale, imagen social y licencia.
- `public/robots.txt` — permisos de rastreo y ubicación del sitemap.
- `src/lib/posts.ts` — helpers de posts: publicados vs. borradores, orden, agrupación por año, filtro por tema, fechas civiles y tiempo de lectura.
- `src/pages/sobre.astro` — página "Sobre mí".
- `src/styles/global.css` — tokens de diseño (colores, tipografía, espaciado) y estilos base.
- `src/components/Topbar.astro` — navegación superior.
- `src/components/Cronologia.astro` — línea del pensamiento: años, marcadores y filas de post. La comparten índice y páginas de tema.
- `src/components/FiltroTemas.astro` — fila de filtros. Son enlaces a `/temas/<tema>/`, sin JavaScript.
- `src/data/temas.ts` — temas editoriales: etiqueta, abreviatura, tono de color y descripción de una línea.
- `public/` — assets estáticos servidos tal cual (favicon, imágenes sueltas).
- `spec/` — documentación del proyecto (specs, features, constitución, bitácora).
- `referente-de-diseno/` — material de referencia visual y estructural heredado. **No es parte del blog en producción.**

## Comandos

Todos se ejecutan desde la raíz del proyecto.

- `pnpm install` — instala dependencias.
- `pnpm dev` — arranca el servidor de desarrollo en `http://localhost:4321`.
- `pnpm build` — genera el sitio estático en `dist/`.
- `pnpm preview` — sirve `dist/` localmente para verificar el build de producción.
- `pnpm lint` — corre ESLint sobre el código.
- `pnpm astro check` — validación de tipos sobre `.astro` y TypeScript.

## Modelo de datos / dominio

_Entidad central del blog._

- **Post** — unidad de contenido.
  - `title` (string, requerido) — título legible.
  - `description` (string, requerido) — bajada o resumen de 1-2 frases. Aparece en listados y metadatos.
  - `pubDate` (fecha civil `AAAA-MM-DD`, requerido) — fecha de publicación. Determina el orden cronológico. Se guarda como cadena, no como `Date`, para que ninguna zona horaria la desplace un día.
  - `updatedDate` (fecha civil, opcional) — última fecha de actualización material del contenido. Si existe, se muestra junto a "Actualizado el …".
  - `topic` (enum, requerido) — uno de: `filosofia`, `educacion`, `mundo-editorial`, `inteligencia-artificial`, `general`.
  - `epigraph` (objeto, opcional) — cita breve que abre el texto: `text` requerido, `source` opcional. Se renderiza antes del cuerpo; no se confunde con una cita destacada, que va en el Markdown con `>`.
  - `draft` (boolean, default `false`) — si es `true`, el post no se incluye en el build de producción.
  - `id` — derivado del nombre del archivo, lo gestiona el loader `glob()` de Astro.

## Convenciones

- Nombres de archivos de post: `kebab-case-en-espanol.md`. Sin prefijos numéricos, sin fechas en el nombre. La fecha va en el frontmatter.
- Frontmatter en YAML. Las fechas se escriben `AAAA-MM-DD`, con o sin comillas: el schema normaliza ambas formas.
- Contenido en español, sin tildes ni ortografía sacrificadas por el slug (el slug es legible: `aula-como-espacio-fenomenologico.md`, no `aula-como-espacio-fenomenolgco`).
- Una línea en blanco separa párrafos. Sin HTML dentro del `.md` salvo que sea estrictamente necesario; si lo es, se comenta por qué.
- Citas largas en blockquote con `>`. Itálicas para títulos de obras (`_Ser y tiempo_`).
- Commits: conventional commits en español donde aporten claridad (`docs:`, `feat:`, `fix:`, `chore:`). Mensaje de commit en imperativo presente.
- Idioma del código: identificadores, comentarios y nombres de variables en inglés cuando aplique; documentación y mensajes al usuario en español.

## Estilo visual

- Dirección: archivo editorial sereno con acentos de atardecer, portada del prototipo `Blog.html` (Claude Design). Especificación completa en `../diseno/direccion-visual.md`.
- Paleta: papel crema, tinta cálida, rojo de acento, arena, teal profundo, óxido y café. Modo oscuro con `[data-theme="dark"]` sobre los mismos nombres de token.
- Tipografía: Newsreader para lectura; IBM Plex Mono para fechas, temas y metadatos.
- Ancho de lectura: máx. ~70 caracteres por línea en desktop. Móvil: a una columna, tipografía generosa.
- Sin animaciones innecesarias. Sin parallax. Los degradados se limitan al fondo fijo, los marcos de imagen, la línea del pensamiento y el borde del footer.
- El tema se resuelve con un script inline en `<head>` (evita el parpadeo) y se persiste en `localStorage` bajo la clave `tema`.
- Licencia del contenido editorial: CC BY-NC 4.0.

## Límites duros

_Lo que NUNCA se debe hacer._

- **No subir al repo** `.env*`, claves, ni credenciales. Si alguna vez hace falta un token (por ejemplo, para deploy), va en variables de entorno del sistema o del panel de Hostinger, nunca en archivos del repo.
- **No importar ni copiar `referente-de-diseno/` desde `src/` o `public/`.** La carpeta permanece versionada como archivo histórico y no se añade a `.gitignore`.
- **No añadir frameworks de UI pesados** (Tailwind, Bootstrap, etc.) sin discutirlo en una feature. La constitución es "CSS plano hasta nuevo aviso".
- **Verificar que `referente-de-diseno/` no aparezca en `dist/`.** No se usa `vite.exclude` para este propósito: la separación se garantiza evitando imports y copias hacia las entradas de producción.
- **No editar `astro-base/` dentro de `referente-de-diseno/`** salvo para tomar notas. Es solo referencia.
- **No fusionar `referente-de-diseno/` con `src/`.** Son dominios distintos: uno es archivo, otro es producción. Si hace falta reutilizar algo, se reescribe limpio en `src/`.
