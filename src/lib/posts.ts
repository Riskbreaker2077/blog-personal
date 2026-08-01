import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

const MESES_LARGOS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MESES_CORTOS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

/**
 * Los borradores existen en desarrollo y desaparecen del build de producción.
 * Es el único punto donde se decide qué es visible: rutas y listados parten de
 * aquí para que no puedan divergir.
 */
export async function obtenerPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "posts",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => b.data.pubDate.localeCompare(a.data.pubDate));
}

export function anio(fecha: string): string {
  return fecha.slice(0, 4);
}

export function formatearFecha(
  fecha: string,
  formato: "largo" | "corto" = "largo",
): string {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  if (formato === "corto") {
    return `${String(dia).padStart(2, "0")} ${MESES_CORTOS[mes - 1]}`;
  }
  return `${dia} de ${MESES_LARGOS[mes - 1]} de ${anio}`;
}

/**
 * Aproximación deliberada: se descarta la sintaxis Markdown, se cuentan
 * palabras separadas por espacio y se divide entre 200 ppm, un ritmo razonable
 * para prosa en español. Redondea hacia arriba y nunca baja de 1 minuto.
 */
export function tiempoDeLectura(markdown: string): number {
  const texto = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}>\s?/gm, " ")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[*_~#>|-]/g, " ");

  const palabras = texto.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

/** Anterior = más antiguo; siguiente = más reciente. */
export function vecinos(posts: Post[], id: string) {
  const indice = posts.findIndex((post) => post.id === id);
  if (indice === -1) return { anterior: undefined, siguiente: undefined };
  return {
    anterior: posts[indice + 1],
    siguiente: posts[indice - 1],
  };
}
