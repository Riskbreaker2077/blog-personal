import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITIO } from "../data/sitio";
import { TEMAS } from "../data/temas";
import { obtenerPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  // `obtenerPosts` deja pasar borradores en desarrollo, cómodo para revisar el
  // sitio. El feed no: lo que sale por aquí es público y no se puede recoger.
  const posts = (await obtenerPosts()).filter((post) => !post.data.draft);

  return rss({
    title: SITIO.nombre,
    description: SITIO.descripcion,
    site: context.site!,
    trailingSlash: true,
    // `<author>` de RSS 2.0 exige un correo; Dublin Core permite firmar con
    // nombre y es lo que leen los agregadores.
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      // Mediodía UTC: la fecha civil no se mueve de día en ningún huso al
      // convertirse en el formato con hora que exige RSS.
      pubDate: new Date(`${post.data.pubDate}T12:00:00Z`),
      link: `/posts/${post.id}/`,
      categories: [TEMAS[post.data.topic].label],
      customData: `<dc:creator>${SITIO.autor}</dc:creator>`,
    })),
    customData: [
      `<language>${SITIO.idioma}</language>`,
      `<copyright>Contenido bajo ${SITIO.licenciaNombre}</copyright>`,
    ].join(""),
  });
}
