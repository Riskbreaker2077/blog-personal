# Dirección visual

**Estado:** aprobada el 31 de julio de 2026. Revisada el 31 de julio de 2026 para adoptar el prototipo `Blog.html` del proyecto de Claude Design `Blog.Personal` (`8ec993c7-4de0-4fbc-a43a-4f97925213bf`), que sustituye la paleta magenta/berenjena anterior.

## Tesis

El blog combina un **archivo editorial sereno** con **acentos de atardecer**. La lectura vive en una interfaz cálida, tipográfica y silenciosa; la energía visual —rojo, arena, teal y óxido— se reserva para la línea del pensamiento, los marcadores de tema, los marcos de imagen y los degradados de fondo.

El texto sigue siendo el producto. El color crea identidad, no ruido.

## Qué se conserva del referente

- Portada concebida como índice o bitácora.
- Línea cronológica con años, fechas y marcadores.
- Serif editorial para títulos y lectura.
- Monoespaciada para fechas, temas y metadatos.
- Navegación mínima: `índice`, `sobre`, `archivo`.
- Títulos con cursivas expresivas y márgenes generosos.
- Footer personal: “Hecho desde el Quindío”.

## Qué se adapta

- Los filtros de portada se convierten en enlaces reales a páginas de tema (feature 002). Hasta entonces la portada no muestra la fila de filtros.
- Las portadas de posts son opcionales.
- La barra de progreso se reserva para textos largos.
- El **modo oscuro sí forma parte del producto**: se resuelve con `data-theme` en `<html>`, botón en la navegación y persistencia en `localStorage`. `/ahora` y `/proyectos` siguen en backlog.
- El panel de ajustes (`tweaks-panel`), el cursor personalizado, la marginalia y el ajuste de densidad del prototipo no forman parte del producto.
- El prototipo es React sobre CDN; el producto es Astro estático. Solo se porta el HTML/CSS.
- Las imágenes del referente sirven como atmósfera y paleta; no se publican sin licencia verificable. La imagen con marca de agua nunca se usa en producción.

## Sistema visual

### Paleta

Modo claro:

- `--cream: #F7F4EE` — fondo principal (`--paper`).
- `--cream-2: #ECE5D7` — superficies y tramas.
- `--ink: #17110D` / `--ink-2: #332720` — texto y estructura.
- `--accent: #C41508` — rojo, acento principal.
- `--gold: #D4BB7C` — arena, segundo acento.
- `--teal: #0F4B4B` — acento profundo.
- `--rose: #9C3A2A` y `--coffee: #854D27` — óxido y café para tonos de tema.

Modo oscuro (`[data-theme="dark"]`):

- `--cream: #020609`, `--cream-2: #0E1417`, `--ink: #F2EDE4`, `--ink-2: #CFC6BA`.
- `--accent: #E5502F`, `--teal: #1F8080`, `--coffee: #B47A45`, `--rose: #C06A4C`; `--gold` se mantiene.

Cada tema editorial tiene un tono: filosofía → rojo, educación → arena, mundo editorial → café, inteligencia artificial → teal, general → apagado. Los tonos colorean marcadores y etiquetas, no bloques enteros. El contraste debe cumplir WCAG AA en ambos modos.

### Tipografía

- Títulos y cuerpo: Newsreader (variable, servida con `@fontsource-variable`), con fallback serif del sistema.
- Metadatos: **IBM Plex Mono** (elección validada en la feature 000; el prototipo usa JetBrains Mono, que se descarta para no añadir otra familia).
- UI auxiliar: la monoespaciada en tamaños pequeños.

Las fuentes se sirven desde el propio dominio, sin CDN de terceros.

### Firma

La **línea del pensamiento** conecta años, fechas y entradas. Es el elemento reconocible del sitio y representa la evolución de las ideas en el tiempo. Debe aportar estructura, no actuar como adorno.

## Criterios transversales

- Lectura de aproximadamente 65–70 caracteres por línea.
- Responsive desde 360 px.
- Foco de teclado visible.
- Enlace para saltar al contenido.
- Respeto por `prefers-reduced-motion`.
- HTML semántico y fechas con `<time>`.
- Sin JavaScript cuando HTML y CSS resuelvan el caso.
- Ninguna imagen es obligatoria para publicar.

## Páginas

- **Índice:** tesis editorial, entrada destacada opcional, últimas entradas y acceso a temas/archivo.
- **Post:** tema, fecha, tiempo de lectura, título, descripción, portada opcional, cuerpo y navegación contigua.
- **Archivo:** línea cronológica y entradas agrupadas por año.
- **Tema:** listado editorial estable, incluso cuando esté vacío.
- **Sobre:** retrato opcional, biografía, intención y contacto.
- **404:** breve, útil y coherente con la voz del sitio.
