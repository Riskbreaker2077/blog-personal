# Camilo Moreno — Blog

Blog personal sobre filosofía, educación e inteligencia artificial.
Construido con [Astro](https://astro.build): HTML estático, posts en Markdown,
cero JavaScript en producción salvo el toggle de modo oscuro y la barra de
progreso de lectura.

---

## Estructura

```
astro/
├── public/                  # archivos estáticos (favicon, imágenes, etc.)
├── src/
│   ├── content/
│   │   ├── config.ts        # esquema (frontmatter) de los posts
│   │   └── posts/           # ← AQUÍ ESCRIBES. Un .md por entrada.
│   │       └── *.md
│   ├── data/
│   │   └── site.ts          # autor, categorías, proyectos, página /ahora
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   └── Topbar.astro
│   ├── pages/               # cada archivo aquí es una URL
│   │   ├── index.astro      # /
│   │   ├── ahora.astro      # /ahora
│   │   ├── proyectos.astro  # /proyectos
│   │   ├── sobre.astro      # /sobre
│   │   ├── archivo.astro    # /archivo
│   │   └── posts/[...slug].astro   # /posts/<slug-del-archivo-md>
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── netlify.toml             # config para deploy en Netlify
```

---

## Empezar

Necesitas **Node.js 20 o superior**. Si no lo tienes:
[nodejs.org/es/download](https://nodejs.org/es/download).

```bash
cd astro
npm install
npm run dev
```

Abre `http://localhost:4321`. Cualquier cambio que hagas en `src/` se refleja
en vivo.

Para generar la versión final (estática) que vas a desplegar:

```bash
npm run build
```

Sale en `dist/`. Para probarla localmente antes de subir:

```bash
npm run preview
```

---

## Escribir un post

Crea un archivo `.md` en `src/content/posts/`. El nombre del archivo es la
URL: `mi-post.md` → `/posts/mi-post/`.

Estructura del frontmatter (todo lo de arriba entre `---`):

```markdown
---
title: "Sobre máquinas que parecen pensar"
date: 2026-04-22
reading: 9
category: ia               # filosofia | educacion | ia
tags: ["filosofía de la mente", "LLMs"]
excerpt: "Un resumen corto que aparece en la home y como subtítulo del post."
draft: false               # opcional, si es true no se publica
---

Aquí empieza el cuerpo. Astro acepta Markdown estándar.

## Un subtítulo

Cada `## Subtítulo` queda con un símbolo § decorativo a la izquierda.

> Las citas con `>` aparecen como pull quotes — letra grande, cursiva,
> barra roja a la izquierda.

Para una nota inline tipo tooltip (al pasar el mouse aparece el dato):

<span class="note" data-note="Computing Machinery and Intelligence, 1950.">
la prueba operativa de Turing
</span>
```

Reglas mínimas:

- **`date`** en formato `YYYY-MM-DD` (sin comillas).
- **`category`** tiene que ser exactamente uno de: `filosofia`, `educacion`, `ia`.
  Si quieres agregar categorías nuevas, edítalas en
  `src/data/site.ts` y `src/content/config.ts`.
- **`reading`** es entero, en minutos.
- **`tags`** es una lista; pueden tener espacios y acentos.
- Si pones `draft: true`, el post no aparece en el sitio pero sí queda
  versionado.

---

## Cambiar datos del autor, proyectos y /ahora

Está todo en **`src/data/site.ts`** — un único archivo con:

- `AUTHOR` (nombre, ubicación, email, etc.)
- `CATEGORIES` (etiqueta y color)
- `PROJECTS` (los que aparecen en /proyectos)
- `NOW` (los bloques de /ahora — actualízala cuando cambie algo)

---

## Desplegar

### Opción A — Netlify (recomendado, 5 min)

1. Sube todo a un repo de GitHub (privado o público, da igual).
2. En [netlify.com](https://netlify.com) → **Add new site → Import existing project**.
3. Elige el repo. Netlify lee `netlify.toml` y configura solo:
   `command: npm run build`, `publish: dist`.
4. Listo. Te da una URL `nombre.netlify.app`. Cada `git push` redespliega.
5. Para tu dominio: **Domain settings → Add custom domain**.

### Opción B — Vercel

1. [vercel.com](https://vercel.com) → **New project** → conecta el repo.
2. Detecta Astro automáticamente.
3. Deploy.

### Opción C — Cloudflare Pages

1. [pages.cloudflare.com](https://pages.cloudflare.com) → **Create project**.
2. Framework preset: **Astro**. Build command: `npm run build`.
   Output directory: `dist`.
3. Deploy.

### Opción D — GitHub Pages

Necesita un workflow extra (`.github/workflows/deploy.yml`). Si quieres ir por
ahí, dime y te lo armo — pero Netlify / Vercel / Cloudflare son más simples.

---

## Conectar tu dominio

Cuando tengas el dominio (ej. `camilomoreno.co`):

1. En el panel del proveedor (Netlify/Vercel/Cloudflare) → **Add custom domain**
   → escribe tu dominio.
2. Te muestra dos opciones:
   - **Nameservers** (apuntar TODO el dominio al proveedor). Lo más simple.
   - **Registros DNS individuales** (CNAME / A). Útil si tu dominio ya
     gestiona otras cosas (correo, etc.).
3. Vas a la página de tu registrador (Namecheap, GoDaddy, Google Domains,
   etc.) y pegas los datos que te dio el proveedor.
4. El HTTPS se activa solo (Let's Encrypt) en pocos minutos.

Después actualiza `site` en `astro.config.mjs` con tu dominio.

---

## Cosas que puedes agregar (sin reescribir nada)

- **RSS feed**: `npm install @astrojs/rss` y crear `src/pages/rss.xml.ts`
  (~15 líneas).
- **Imágenes en posts**: meterlas en `src/assets/` y usar `<Image>` de
  `astro:assets` — optimiza automáticamente.
- **Página por tag**: una `src/pages/tags/[tag].astro` que filtre la colección.
- **Buscador**: con [Pagefind](https://pagefind.app) — funciona estático,
  sin servidor.
- **Newsletter**: integrar con Buttondown o Beehiiv vía un formulario simple.

Si quieres alguna de estas, dime y te la agrego.

---

## Soporte

Esto es código estándar de Astro — cualquier dev frontend lo puede tocar
sin contexto especial. La documentación oficial está en
[docs.astro.build](https://docs.astro.build) y es excelente.
