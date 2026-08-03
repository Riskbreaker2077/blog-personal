# 005 · Ilustración de portada y puntuación temática — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Las dos piezas comparten una idea: **el color no se escribe dos veces**. Los tonos de tema viven en `src/data/temas.ts` y `src/styles/global.css`, y tanto el grafo como la puntuación los leen de ahí. Cambiar el tono de un tema cambia los dos sitios sin tocarlos.

Por lo demás son opuestas por diseño:

- El grafo es **lo único del sitio con JavaScript propio**. No hay forma de dibujarlo sin lienzo, así que se acota: componente de Astro (no archivo suelto en `public/`) para que solo se descargue donde se usa, y con todos los frenos puestos.
- La puntuación es **cero JavaScript**. Se resuelve en el build con un plugin de rehype, porque envolver signos en el navegador significaría reescribir el DOM del texto después de pintarlo.

## Implementación

1. **`src/components/GrafoCerebral.astro`** — custom element `<grafo-cerebral>` con lienzo en el shadow DOM. Física de resortes, giro lento y reacción al puntero. La paleta se resuelve con `getComputedStyle` sobre `document.documentElement` y se reevalúa con un `MutationObserver` sobre `data-theme`. `IntersectionObserver` para parar el bucle fuera de pantalla.
2. **`src/pages/index.astro`** — sustituye el marcador del hero. Columna de 20rem, desbordamiento hacia el texto, `mask-image` radial `closest-side` y `display: none` bajo 47.5rem. `.hero-copy` y `.filtros` con `z-index: 1` para que el grafo pase por detrás sin robar clics ni selección.
3. **`src/lib/rehype-puntuacion.mjs`** — recorre el árbol HTML de cada post y parte los nodos de texto en tramos de prosa y tramos de puntuación, envolviendo estos últimos en `<span class="punct">`. Se salta `pre`, `code`, `script` y `style`.
4. **`astro.config.mjs`** — registra el plugin en `markdown.rehypePlugins`.
5. **`src/layouts/PostLayout.astro`** — `data-tone` en `.post-body` y una variable `--punct` por tono.

## Decisiones

- **Componente de Astro, no archivos en `public/`** — el original venía como `.js` + `.css` sueltos con instrucciones de copiarlos a `public/`. Así Astro lo empaqueta, lo minifica y solo lo sirve en la portada; en `public/` habría sido una descarga global sin procesar.
- **Colores leídos de los tokens, no copiados** — el componente original traía cuatro hexadecimales escritos a mano que resultaron ser los tokens base del blog. Se apuntan a los tonos de tema (`--tone-*`), que son los que usan los marcadores de la cronología, y se añade el quinto (`general`), que faltaba.
- **El color se resuelve con `fillStyle` y dos centinelas, no con un parser propio** — se probó parsear hexadecimales a mano y falló con `--tone-muted`, que es `rgba()`. Dejar que el navegador interprete el valor aguanta cualquier formato futuro (`color-mix()`, `oklch()`). Los dos centinelas distinguen «el color era negro» de «el valor no se pudo leer», porque asignar basura a `fillStyle` no lanza error.
- **`touch-action: pan-y` e interacción solo con ratón** — el componente original usaba `touch-action: none`, que en móvil impedía desplazar la página con el dedo sobre el grafo. En pantalla táctil el grafo es ambiental y no captura el gesto.
- **La puntuación se mezcla con la tinta al 70%** — a color pleno, el oro sobre papel crema deja comas prácticamente invisibles, y una coma que no se ve cambia cómo se lee la frase. `general` no tiñe nada.
- **Plugin propio en vez de `unist-util-visit`** — son veinte líneas de recorrido; no justifica una dependencia. La constitución exige discutir cualquier paquete nuevo.

## Riesgos

- **El grafo es la única animación del sitio** y contradice el criterio «sin animaciones innecesarias». Mitigado acotándolo: es la ilustración, no un efecto sobre el contenido; se detiene fuera de pantalla; respeta `prefers-reduced-motion`; no existe en móvil. Queda anotado como excepción explícita en `tech-stack.md` y en `direccion-visual.md`, con la nota de que no sienta precedente.
- **El grafo puede tapar texto o robar clics** al desbordarse hacia la columna de lectura. Mitigado con `z-index` en `.hero-copy` y en un envoltorio `.filtros`, de modo que el texto se selecciona y los filtros se pulsan aunque el lienzo pase por debajo.
- **Un desbordamiento horizontal en móvil encoge la página entera.** Ocurrió de verdad con la cabecera fija (sesión 11) por un `-50vw`. El grafo tiene el mismo riesgo: su margen derecho se queda en `-1rem`, por debajo del canalón mínimo de `.shell` (`1.375rem`).
- **La puntuación teñida puede molestar la lectura.** Mitigado con la mezcla al 70% y dejando que enlaces y citas manden sobre el tono.
