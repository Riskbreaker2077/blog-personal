import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { TEMAS, type TemaId } from "./data/temas";

const temas = Object.keys(TEMAS) as [TemaId, ...TemaId[]];

const dosDigitos = (n: number) => String(n).padStart(2, "0");

/**
 * Fecha civil: `AAAA-MM-DD` como cadena, nunca como `Date`.
 * Un `Date` construido desde `2026-07-31` es medianoche UTC y, formateado en
 * Bogotá (UTC-5), retrocede al día 30. Guardar la cadena elimina el problema
 * de raíz y además ordena lexicográficamente igual que cronológicamente.
 *
 * YAML convierte `2026-07-31` sin comillas en un `Date`, así que se acepta
 * también esa forma y se reduce a sus componentes UTC, que son exactamente los
 * que el autor escribió.
 */
const fechaCivil = z.preprocess(
  (valor) =>
    valor instanceof Date
      ? `${valor.getUTCFullYear()}-${dosDigitos(valor.getUTCMonth() + 1)}-${dosDigitos(valor.getUTCDate())}`
      : valor,
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Usa el formato AAAA-MM-DD.")
    .refine((valor) => {
      const [anio, mes, dia] = valor.split("-").map(Number);
      const fecha = new Date(Date.UTC(anio, mes - 1, dia));
      return (
        fecha.getUTCFullYear() === anio &&
        fecha.getUTCMonth() === mes - 1 &&
        fecha.getUTCDate() === dia
      );
    }, "La fecha no existe en el calendario."),
);

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3).max(90),
      description: z.string().min(20).max(240),
      pubDate: fechaCivil,
      // Solo para revisiones materiales del contenido, no para retoques.
      updatedDate: fechaCivil.optional(),
      topic: z.enum(temas),
      draft: z.boolean().default(false),
      // Portada opcional; si existe, el texto alternativo es obligatorio.
      cover: z
        .object({
          src: image(),
          alt: z.string().min(3),
        })
        .optional(),
    }),
});

export const collections = { posts };
