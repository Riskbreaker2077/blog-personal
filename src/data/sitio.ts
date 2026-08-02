/**
 * Identidad del sitio para metadatos: `<head>`, RSS y datos estructurados.
 * Un solo lugar para que el título, el autor y la licencia no se contradigan
 * entre la portada, el feed y lo que lee un buscador.
 */
export const SITIO = {
  nombre: "Camilo Moreno — bitácora",
  autor: "Camilo Moreno",
  /**
   * Versión corta de la entradilla de la portada. Se queda por debajo de los
   * ~160 caracteres que muestran los buscadores; la entradilla completa vive
   * en `src/pages/index.astro`.
   */
  descripcion:
    "Un lugar de reflexión personal sobre las situaciones presentes, los pensamientos pasados y las ideas de futuro. Apuntes sobre filosofía, educación y tecnología.",
  idioma: "es",
  /** Formato de `og:locale`, que no admite solo el código de idioma. */
  locale: "es_CO",
  /**
   * Imagen por defecto de las tarjetas al compartir. 1200×630, JPEG: una foto
   * en PNG pesaría diez veces más sin verse mejor.
   *
   * Valle de Cocora, de Bernard Gagnon (Wikimedia Commons), recortada.
   * CC BY-SA 4.0 — la atribución es obligatoria y está en `/sobre/`.
   */
  imagenSocial: "/og.jpg",
  creditoImagenSocial: {
    obra: "Valle de Cocora",
    autor: "Bernard Gagnon",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Valle_de_Cocora,_Colombia_03.jpg",
    licencia: "https://creativecommons.org/licenses/by-sa/4.0/",
    licenciaNombre: "CC BY-SA 4.0",
  },
  licencia: "https://creativecommons.org/licenses/by-nc/4.0/",
  licenciaNombre: "CC BY-NC 4.0",
} as const;
