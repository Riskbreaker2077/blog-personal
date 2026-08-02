/**
 * Envuelve los signos de puntuación del cuerpo de los posts en
 * `<span class="punct">` para que puedan tomar el color del tema.
 *
 * Corre en tiempo de build, sobre el árbol HTML que produce Markdown: no añade
 * ni un byte de JavaScript al sitio publicado. Se escribe a mano, sin
 * `unist-util-visit`, para no traer una dependencia por veinte líneas.
 */

/** Donde la puntuación es sintaxis y no prosa, se deja en paz. */
const OMITIR = new Set(["pre", "code", "script", "style"]);

/**
 * Signos de puntuación, incluidos los de apertura del español y las comillas
 * tipográficas. Fuera quedan el guion —une palabras, no separa oraciones— y la
 * barra, que casi siempre está dentro de una URL.
 */
const PUNTUACION = /[.,;:!?¡¿…·—–«»"'“”‘’()[\]{}]+/g;

/** Parte un texto en tramos de prosa y tramos de puntuación. */
function trocear(texto) {
  const salida = [];
  let ultimo = 0;

  for (const coincidencia of texto.matchAll(PUNTUACION)) {
    const inicio = coincidencia.index;
    if (inicio > ultimo) {
      salida.push({ type: "text", value: texto.slice(ultimo, inicio) });
    }
    salida.push({
      type: "element",
      tagName: "span",
      properties: { className: ["punct"] },
      children: [{ type: "text", value: coincidencia[0] }],
    });
    ultimo = inicio + coincidencia[0].length;
  }

  if (ultimo < texto.length) {
    salida.push({ type: "text", value: texto.slice(ultimo) });
  }
  return salida;
}

function recorrer(nodo) {
  if (!Array.isArray(nodo.children)) return;

  const hijos = [];
  for (const hijo of nodo.children) {
    if (hijo.type === "text") {
      hijos.push(...trocear(hijo.value));
      continue;
    }
    if (hijo.type === "element" && !OMITIR.has(hijo.tagName)) {
      recorrer(hijo);
    }
    hijos.push(hijo);
  }
  nodo.children = hijos;
}

export function rehypePuntuacion() {
  return (arbol) => recorrer(arbol);
}
