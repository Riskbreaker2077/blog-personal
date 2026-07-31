# Misión

_Define la razón de ser del proyecto. Es la referencia que decide si una feature "encaja" o no._

## Qué construimos

Un blog personal estático con Astro, escrito en español, donde Camilo publica textos breves y largos sobre educación, filosofía, corrección de estilo y oficio docente. Es la "capa pública" de un espacio más amplio (`camilomoreno.co` ya hospeda la corrección; este blog es el canal de pensamiento largo y archivo).

_Piezas principales del producto:_

1. **Listado de posts** — página de inicio y archivo cronológico navegable.
2. **Páginas de post** — una URL por texto, legible, compartible, con metadatos (fecha, tema, tiempo de lectura).
3. **Página "Sobre mí"** — quién escribe, desde dónde, con qué intención.
4. **Sistema de temas / series** — agrupación opcional por línea temática para que el lector encuentre textos afines.

## Para quién

- **Lector habitual** — colegas docentes, estudiantes, lectores de filosofía y educación en español. Busca ideas articuladas, no feeds rápidos.
- **Lector ocasional** — llega desde redes o búsquedas. Necesita landing clara y un post de entrada que enganche.
- **El propio Camilo** — necesita un sistema de escritura de baja fricción (escribir en Markdown, commitear, publicar) y un archivo que se sostenga solo en el tiempo.

## Principios

_Las ideas rectoras que guían las decisiones de producto y técnicas. 3-5 puntos._

- **El texto es el producto.** La interfaz no compite con el contenido: tipografía legible, márgenes generosos, sin widgets sociales ruidosos.
- **Estático, sin servidor.** El blog se sirve como HTML precompilado. Sin base de datos, sin login, sin tracking invasivo. Lo único dinámico es la fecha de publicación.
- **Escribir debe ser barato.** Crear un post = crear un archivo `.md` y hacer commit. No CMS, no panel, no base de datos.
- **Archivo antes que algoritmo.** No hay feed "para ti". Hay orden cronológico y temas, y el lector decide.
- **Idioma: español.** UI, contenido y mensajes en español. Sin traducción automática al inglés.

## Qué NO es

_Acota el alcance: lo que el proyecto deliberadamente no pretende ser. Evita malentendidos y feature creep._

- No es un CMS, ni un panel de administración, ni un editor WYSIWYG. La edición es en local con el editor de texto que prefieras.
- No es un portal con comentarios, likes, suscriptores, ni newsletter integrada en esta primera fase.
- No es una red social ni un feed. No tiene notificaciones, ni perfiles de usuario, ni autenticación.
- No es multilenguaje. Si en el futuro hace falta inglés, será un proyecto hermano, no un feature de este.
- No reemplaza a `camilomoreno.co` (corrección) ni a `camilomoreno.com` (sitios temáticos). Este blog es el canal de pensamiento largo; los otros sitios siguen siendo independientes.
