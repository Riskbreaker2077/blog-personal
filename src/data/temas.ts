export type TemaId =
  | "filosofia"
  | "educacion"
  | "mundo-editorial"
  | "inteligencia-artificial"
  | "general";

export type Tono = "accent" | "gold" | "peri" | "ink" | "muted";

export interface Tema {
  label: string;
  short: string;
  tono: Tono;
  /** Una línea. Encabeza la página del tema y alimenta su `<meta name="description">`. */
  descripcion: string;
}

export const TEMAS: Record<TemaId, Tema> = {
  filosofia: {
    label: "Filosofía",
    short: "fil",
    tono: "accent",
    descripcion:
      "Preguntas que no se dejan resolver rápido: lenguaje, técnica, existencia y las cosas que damos por sentadas.",
  },
  educacion: {
    label: "Educación",
    short: "edu",
    tono: "gold",
    descripcion:
      "El oficio docente por dentro: leer con otros, sostener la atención y decidir qué merece una clase.",
  },
  "mundo-editorial": {
    label: "Mundo editorial",
    short: "edt",
    tono: "peri",
    descripcion:
      "Elegir, ordenar, corregir y publicar: notas sobre el trabajo que rodea a los libros.",
  },
  "inteligencia-artificial": {
    label: "Inteligencia artificial",
    short: "ia",
    tono: "ink",
    descripcion:
      "Máquinas que escriben y hablan, y lo que su compañía le hace al criterio y al trabajo intelectual.",
  },
  general: {
    label: "General",
    short: "gen",
    tono: "muted",
    descripcion:
      "Textos que no caben en un solo cajón: apuntes sueltos, notas de lectura y asuntos de la casa.",
  },
};

export const TEMAS_ORDENADOS = Object.entries(TEMAS) as [TemaId, Tema][];
