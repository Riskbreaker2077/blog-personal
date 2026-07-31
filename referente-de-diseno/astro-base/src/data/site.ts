// Datos del sitio que no son posts: autor, categorías, proyectos, página /ahora.
// Cuando algo cambie aquí, el build lo refleja.

export const AUTHOR = {
  name: "Camilo Moreno",
  handle: "@camilomoreno",
  bio: "Escribo sobre filosofía, educación e inteligencia artificial. Doy clases. Leo despacio.",
  location: "Bogotá",
  since: "2021",
  email: "camilo@correo.tld",
};

export type CategoryKey = "filosofia" | "educacion" | "ia";

export const CATEGORIES: Record<CategoryKey, { label: string; short: string; tone: "accent" | "gold" | "ink" }> = {
  filosofia: { label: "Filosofía", short: "fil", tone: "accent" },
  educacion: { label: "Educación", short: "edu", tone: "gold"   },
  ia:        { label: "IA",        short: "ia",  tone: "ink"    },
};

export const PROJECTS = [
  {
    name: "Curso: Filosofía de la IA",
    period: "2025 — en curso",
    status: "activo",
    summary: "Curso semestral en la universidad. Lecturas que van de Turing a Floridi, pasando por Wittgenstein.",
  },
  {
    name: "Cuaderno sobre la atención",
    period: "2024 — borrador",
    status: "lento",
    summary: "Manuscrito de un libro corto. Cien páginas. Avanza más despacio de lo que me gustaría.",
  },
  {
    name: "Pedagogías del prompt",
    period: "2025",
    status: "publicado",
    summary: "Artículo en revista de educación sobre cómo cambian las consignas cuando los estudiantes tienen LLMs.",
  },
  {
    name: "Seminario abierto: Heidegger + IA",
    period: "2026",
    status: "planeado",
    summary: "Ocho sesiones gratuitas, abiertas, sobre 'La pregunta por la técnica' leída a la luz del presente.",
  },
] as const;

export const NOW = {
  updated: "2026-05-12",
  city: "Bogotá",
  blocks: [
    {
      label: "Leyendo",
      items: [
        "Iris Murdoch — La soberanía del bien",
        "Brian Christian — The Alignment Problem (relectura)",
        "Antonio Machado — Juan de Mairena, por las noches",
      ],
    },
    {
      label: "Escribiendo",
      items: [
        "Un ensayo largo sobre la diferencia entre comprender y predecir",
        "Notas dispersas para el cuaderno sobre atención",
      ],
    },
    {
      label: "Enseñando",
      items: [
        "Filosofía de la IA (lunes y miércoles)",
        "Seminario de lectura: Wittgenstein tardío (jueves)",
      ],
    },
    {
      label: "Pensando",
      items: [
        "Por qué los modelos hacen mejor metáforas que argumentos",
        "Si tiene sentido seguir hablando de 'inteligencia' en singular",
      ],
    },
  ],
};

// ---------- Helpers ----------
const MESES_LONG = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MESES_SHORT = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

export function fmtDate(d: Date, fmt: "long" | "monthday" | "iso" = "monthday"): string {
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  if (fmt === "long")     return `${day} de ${MESES_LONG[m]}, ${y}`;
  if (fmt === "iso")      return d.toISOString().slice(0, 10);
  return `${String(day).padStart(2,"0")} ${MESES_SHORT[m]}`;
}
