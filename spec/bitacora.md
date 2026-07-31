# Bitácora

_Una entrada por sesión de trabajo. Entradas nuevas arriba. Sin prosa de relleno: qué se hizo, qué quedó pendiente, qué decisiones se tomaron._

## 2026-07-31 · Sesión 1 — Inicio del proyecto

**Qué se hizo**

- Creación del repo `blog-personal` en GitHub (público) y de la carpeta local en `C:\Users\camil\Desktop\Desarrollo\blog-personal\` con `git init` y primer commit.
- Importación del material de `Blog.Personal.zip` (prototipo visual + base Astro) a `referente-de-diseno/`, eliminando una imagen duplicada bit-exact y omitiendo los posts de prueba.
- Definición de la estructura spec-driven del proyecto, alineada con la convención de `portal-estudiantes/`.
- Redacción de la constitución (`mission.md`, `tech-stack.md`, `roadmap.md`) con valores reales del blog.
- Creación de las features 000 (proyecto base) y 001 (sistema de posts) con `spec.md`, `plan.md` y `tasks.md` cada una.
- Commit y push inicial de toda la estructura al remoto.

**Pendiente**

- Implementar la feature 000 (ejecutar `pnpm create astro@latest`, configurar el proyecto, post de prueba).
- Decidir el subdominio real del blog en Hostinger (placeholder actual: `https://blog.camilomoreno.co`).
- Resolver la elección del subdominio antes de la primera subida a producción.

**Decisiones**

- Stack: Astro 5 + TypeScript estricto + pnpm. Sin Tailwind, sin MDX en la 000.
- Deploy: Hostinger (confirmado por Camilo).
- Tema del blog: posts largos en español, archivo cronológico, sin CMS, sin analítica invasiva.
- Temas cerrados: cinco valores (`educacion`, `filosofia`, `correccion`, `oficio-docente`, `general`).
- El referente `referente-de-diseno/` queda como consulta, **no se fusiona** con `src/`.
- **`referente-de-diseno/` SÍ se queda en el repo** como archivo histórico y base de trabajo gráfico. La exclusión del build de Astro se hará vía `astro.config.mjs` en la feature 000, no vía `.gitignore`. (Decisión tomada al cierre de la sesión, después de discutir el alcance.)
