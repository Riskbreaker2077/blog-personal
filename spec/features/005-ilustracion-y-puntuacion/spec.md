# 005 · Ilustración de portada y puntuación temática

**Estado:** implementado ✅

> **Nota de procedimiento.** Esta carpeta se escribió **después** de que el código estuviera en producción, el 2 de agosto de 2026. Contradice la primera regla dura de `CLAUDE.md`, que exige la carpeta antes de tocar el código de una feature. Se documenta a posteriori para recuperar la trazabilidad, no para fingir que el orden fue el correcto.

## Qué hace

Dos gestos visuales que hacen que el color del sitio signifique algo en vez de solo decorar.

**El grafo de la portada.** El hueco de ilustración del hero deja de ser un marcador de posición gris. En su lugar hay un grafo de nodos conectados que se mueve despacio, reacciona al cursor y no termina en ningún borde: se desvanece por los cuatro lados. Cada nodo lleva el color de uno de los cinco temas editoriales, los mismos que marcan las entradas en la cronología.

**La puntuación de los posts.** Dentro del cuerpo de un texto, los signos de puntuación toman el tono de su tema. Un texto de filosofía puntúa en rojo; uno de educación, en arena.

## Por qué

El sitio ya tenía una paleta con significado —cada tema, un tono— pero solo aparecía en puntos de 11 px y en etiquetas. El color era una convención invisible.

El grafo la vuelve legible de un vistazo: la portada muestra el mapa de lo que se escribe aquí. La puntuación la lleva al único lugar que recorre un texto entero sin pertenecer a ninguna palabra, así que el tema acompaña la lectura sin invadirla.

Ninguna de las dos añade contenido. Las dos hacen que el que ya existe se entienda mejor.

## Criterios de aceptación

- [x] El grafo lee sus colores de los tonos de tema de `global.css`; ningún color está escrito en el componente.
- [x] Cambia con el tema claro/oscuro sin recargar la página.
- [x] Se detiene cuando no está en pantalla.
- [x] Con `prefers-reduced-motion` dibuja un solo cuadro y no anima.
- [x] En móvil no se muestra, y su bucle no consume nada.
- [x] En una pantalla táctil, arrastrar el dedo sobre el grafo desplaza la página con normalidad.
- [x] El lienzo no tiene bordes visibles en ninguno de los cuatro lados.
- [x] La puntuación del cuerpo de un post toma el tono de su tema, y sigue siendo legible en ambos modos.
- [x] La puntuación dentro de `code` y `pre` no se altera.
- [x] El sitio publicado no incluye JavaScript por la puntuación: el trabajo ocurre en el build.
- [x] `astro check` sin errores, avisos ni hints. ESLint limpio.

## Fuera de alcance

- **Que el reparto de nodos refleje el conteo real de entradas por tema.** Sería un retrato de lo escrito, pero con una sola entrada saldría un grafo monocromo. Se revisa cuando haya quince textos.
- **Capturar el grafo como imagen social.** La imagen de compartir es una fotografía; ver [`spec/deuda-tecnica.md`](../../deuda-tecnica.md).
- **Teñir también los títulos, la bajada o el epígrafe.** La puntuación se limita al cuerpo del texto.
- **Animar cualquier otra cosa.** Ver la excepción anotada en [`tech-stack.md`](../../constitution/tech-stack.md): esta feature no sienta precedente.
