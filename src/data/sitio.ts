/**
 * Identidad del sitio para metadatos: `<head>`, RSS y datos estructurados.
 * Un solo lugar para que el título, el autor y la licencia no se contradigan
 * entre la portada, el feed y lo que lee un buscador.
 */
export const SITIO = {
  nombre: "Camilo Moreno — bitácora",
  autor: "Camilo Moreno",
  descripcion:
    "Pensamiento largo en español sobre filosofía, educación, mundo editorial e inteligencia artificial.",
  idioma: "es",
  /** Formato de `og:locale`, que no admite solo el código de idioma. */
  locale: "es_CO",
  /** Imagen por defecto de las tarjetas al compartir. 1200×630. */
  imagenSocial: "/og.png",
  licencia: "https://creativecommons.org/licenses/by-nc/4.0/",
  licenciaNombre: "CC BY-NC 4.0",
} as const;
