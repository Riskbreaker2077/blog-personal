# Tech stack y convenciones

_Cómo está construido el proyecto y las reglas que todo el código debe respetar. Es la referencia técnica que ningún plan de feature debería contradecir._

## Tecnologías

- **Lenguaje:** TypeScript estricto (Astro lo exige por defecto).
- **Framework:** Astro 5.x con Content Collections (Markdown + MDX).
- **Runtime / gestor de paquetes:** Node 22 LTS + pnpm (la elección de pnpm es por velocidad y por menor espacio en disco; se puede revisar si surge fricción).
- **Estilos:** CSS plano con variables CSS en `src/styles/global.css`. Sin Tailwind, sin frameworks de UI en esta primera fase.
- **Tipografía:** tipografías del sistema + una serif legible para el cuerpo (a definir en feature 000; opciones: Source Serif, EB Garamond, o una sola fuente del sistema con buen interlineado).
- **Despliegue:** Hostinger. El output de `astro build` se publica en el subdominio o subpath que defina el `site` en `astro.config.mjs`. La subida al hosting se hace por FTP/SSH desde WSL o desde el panel de Hostinger.
- **Tests:** No hay suite en esta primera fase. La validación es por build limpio + inspección visual local. Si crece, se evalúa Vitest.
- **Linter:** ESLint con la config recomendada de Astro. Ejecutar antes de cada commit.

## Archivos / módulos clave

_Mapa breve de dónde vive cada cosa. Solo lo que un recién llegado necesita para orientarse._

- `astro.config.mjs` — configuración de Astro. Define `site` (URL canónica), integraciones, y opciones de build.
- `src/content/config.ts` — schema de las Content Collections (qué campos tiene un post, qué validaciones).
- `src/content/posts/` — todos los posts en `.md` o `.mdx`. Un archivo por post.
- `src/layouts/BaseLayout.astro` — layout raíz. Define `<head>`, metadatos, tipografía, contenedor.
- `src/pages/index.astro` — landing: lista de los posts más recientes.
- `src/pages/archivo.astro` — archivo cronológico completo.
- `src/pages/posts/[...slug].astro` — ruta dinámica que renderiza un post desde su slug.
- `src/pages/sobre.astro` — página "Sobre mí".
- `src/styles/global.css` — tokens de diseño (colores, tipografía, espaciado) y estilos base.
- `src/components/Topbar.astro` — navegación superior.
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
  - `description` (string, opcional) — bajada o resumen de 1-2 frases. Aparece en listados y metadatos.
  - `pubDate` (Date, requerido) — fecha de publicación. Determina el orden cronológico.
  - `updatedDate` (Date, opcional) — última fecha de actualización material del contenido. Si existe, se muestra junto a "Actualizado el …".
  - `topic` (enum, opcional) — uno de: `educacion`, `filosofia`, `correccion`, `oficio-docente`, `general`. Permite agrupar por tema.
  - `draft` (boolean, default `false`) — si es `true`, el post no se incluye en el build de producción.
  - `slug` — derivado del nombre del archivo, lo gestiona Astro.

## Convenciones

- Nombres de archivos de post: `kebab-case-en-espanol.md`. Sin prefijos numéricos, sin fechas en el nombre. La fecha va en el frontmatter.
- Frontmatter en YAML.
- Contenido en español, sin tildes ni ortografía sacrificadas por el slug (el slug es legible: `aula-como-espacio-fenomenologico.md`, no `aula-como-espacio-fenomenolgco`).
- Una línea en blanco separa párrafos. Sin HTML dentro del `.md` salvo que sea estrictamente necesario; si lo es, se comenta por qué.
- Citas largas en blockquote con `>`. Itálicas para títulos de obras (`_Ser y tiempo_`).
- Commits: conventional commits en español donde aporten claridad (`docs:`, `feat:`, `fix:`, `chore:`). Mensaje de commit en imperativo presente.
- Idioma del código: identificadores, comentarios y nombres de variables en inglés cuando aplique; documentación y mensajes al usuario en español.

## Estilo visual

- Paleta: por definir en feature 000. Tendencia: fondo claro, texto casi-negro, un color de acento sobrio. La constitución NO cierra paleta concreta — eso lo define la primera feature de implementación.
- Tipografía: una serif para el cuerpo, una sans-serif del sistema para la UI (navegación, metadatos).
- Ancho de lectura: máx. ~70 caracteres por línea en desktop. Móvil: a una columna, tipografía generosa.
- Sin animaciones innecesarias. Sin parallax. Sin gradientes decorativos.

## Límites duros

_Lo que NUNCA se debe hacer._

- **No subir al repo** `.env*`, claves, ni credenciales. Si alguna vez hace falta un token (por ejemplo, para deploy), va en variables de entorno del sistema o del panel de Hostinger, nunca en archivos del repo.
- **No incluir `referente-de-diseno/` en el build.** El `.gitignore` y la config de Astro deben excluirlo. Ese material es solo consulta, no parte del sitio.
- **No añadir frameworks de UI pesados** (Tailwind, Bootstrap, etc.) sin discutirlo en una feature. La constitución es "CSS plano hasta nuevo aviso".
- **No incluir `referente-de-diseno/` en el build de Astro.** La config de Astro debe excluir ese directorio. El referente **sí vive en el repo** como archivo histórico y base de trabajo gráfico, pero no se sirve al público.
- **No editar `astro-base/` dentro de `referente-de-diseno/`** salvo para tomar notas. Es solo referencia.
- **No fusionar `referente-de-diseno/` con `src/`.** Son dominios distintos: uno es archivo, otro es producción. Si hace falta reutilizar algo, se reescribe limpio en `src/`.
