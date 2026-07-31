# 000 · Proyecto base

**Estado:** propuesta

## Qué hace

Pone en pie el blog con lo mínimo necesario para que se pueda leer, escribir y publicar un primer post de prueba. Incluye:

- Configuración de Astro con TypeScript estricto.
- Layout base con tipografía legible y contenedor de lectura.
- Una página de inicio ("Hola, esto es el blog") con un único post de prueba.
- Una página "Sobre mí" con texto provisional.
- Topbar de navegación con dos enlaces: inicio y sobre mí.
- Estilos base (variables CSS, reset, tipografía).
- Archivo `.gitignore` adecuado para Astro.
- `README.md` en la raíz con instrucciones de arranque.

## Por qué

Necesitamos un esqueleto que funcione antes de empezar a construir features con la cadencia spec-driven. Si la feature 001 (sistema de posts completo) se hace sobre cimientos improvisados, arrastraremos deuda.

## Criterios de aceptación

- [ ] `pnpm install && pnpm dev` arranca un servidor local sin errores.
- [ ] `pnpm build` produce un sitio estático sin warnings.
- [ ] `pnpm lint` y `pnpm astro check` pasan limpios.
- [ ] La página de inicio muestra el post de prueba con su título, fecha y contenido.
- [ ] La página "Sobre mí" es accesible desde la navegación y muestra un texto provisional.
- [ ] La tipografía es legible: cuerpo serif, UI sans-serif, ancho de lectura ≤ 70 caracteres en desktop.
- [ ] El sitio se ve correctamente en móvil (ancho mínimo 360px).
- [ ] El `.gitignore` excluye `node_modules/`, `dist/`, `.astro/` y `referente-de-diseno/`.
- [ ] El post de prueba es un archivo `.md` en `src/content/posts/` con frontmatter mínimo (title, pubDate, description).

## Fuera de alcance

- Sistema completo de posts (listado cronológico, archivo, página individual por slug, temas). Eso es la feature 001.
- Diseño visual acabado. Esta feature solo establece tipografía y estructura; el refinamiento de paleta, espaciado, microinteracciones va en features posteriores.
- RSS, sitemap, Open Graph, modo oscuro. Todo en backlog.
- Personalización de la página 404.
- Despliegue real. Esta feature se queda en local.
