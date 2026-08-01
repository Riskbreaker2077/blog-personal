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
}

export const TEMAS: Record<TemaId, Tema> = {
  filosofia: { label: "Filosofía", short: "fil", tono: "accent" },
  educacion: { label: "Educación", short: "edu", tono: "gold" },
  "mundo-editorial": {
    label: "Mundo editorial",
    short: "edt",
    tono: "peri",
  },
  "inteligencia-artificial": {
    label: "Inteligencia artificial",
    short: "ia",
    tono: "ink",
  },
  general: { label: "General", short: "gen", tono: "muted" },
};

/**
 * Entradas anunciadas mientras la feature 001 (núcleo editorial) no exista.
 * Cuando la Content Layer entre, este módulo se reemplaza por `getCollection`.
 */
export interface EntradaAnunciada {
  estado: string;
  title: string;
  description: string;
  tema: TemaId;
}

export const ENTRADAS_ANUNCIADAS: EntradaAnunciada[] = [
  {
    estado: "próxima",
    title: "Pensar despacio en una época que acelera",
    description:
      "Una nota inaugural sobre la atención, el oficio de leer y la decisión de sostener ideas largas.",
    tema: "filosofia",
  },
  {
    estado: "borrador",
    title: "El aula también es una forma de edición",
    description:
      "Elegir, ordenar, señalar y dejar espacio: apuntes sobre enseñar como práctica editorial.",
    tema: "educacion",
  },
  {
    estado: "borrador",
    title: "Conversar con máquinas sin entregarles la voz",
    description:
      "Preguntas provisionales sobre autoría, criterio y trabajo intelectual asistido.",
    tema: "inteligencia-artificial",
  },
];
