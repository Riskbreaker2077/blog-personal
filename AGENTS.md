# blog-personal — AGENTS.md

_Instrucciones operativas para agentes (humanos o IA) que trabajen en este proyecto._

## Qué es este proyecto

Blog personal estático de Camilo Moreno, escrito en español, construido con Astro 5. Pensado como canal de pensamiento largo: educación, filosofía, corrección de estilo y oficio docente.

La documentación de fondo está en `spec/`. La constitución (`spec/constitution/`) manda: si una feature entra en conflicto con `mission.md` o `tech-stack.md`, se replantea la feature, **no** la constitución.

## Stack

Ver `spec/constitution/tech-stack.md` para el detalle. Resumen: Astro 5 + TypeScript estricto + pnpm. **Sin Tailwind, sin MDX en la 000, sin CMS, sin base de datos, sin analítica invasiva.**

## Comandos

Todos desde la raíz del proyecto.

- `pnpm install` — instala dependencias.
- `pnpm dev` — arranca el servidor de desarrollo en `http://localhost:4321`.
- `pnpm build` — genera el sitio estático en `dist/`.
- `pnpm preview` — sirve `dist/` para validar el build de producción.
- `pnpm lint` — corre ESLint.
- `pnpm astro check` — validación de tipos sobre `.astro` y TypeScript.

## Estructura

- `spec/constitution/` — reglas estables. Cambian poco.
- `spec/features/NNN-nombre/` — `spec.md` (qué), `plan.md` (cómo), `tasks.md` (checklist).
- `spec/backlog/` — ideas sin priorizar.
- `spec/archive/` — features absorbidas/finalizadas.
- `spec/diseno/` — apunta al `referente-de-diseno/` raíz. No es código.
- `referente-de-diseno/` — material heredado. **No se modifica, no se incluye en el build.**

## Convenciones

- Posts: archivos `.md` en `src/content/posts/`. Nombre en `kebab-case-en-espanol.md`. Sin prefijos numéricos, sin fechas en el nombre.
- Frontmatter en YAML. Schema en `src/content/config.ts`.
- Idioma del código: identificadores en inglés. Mensajes, commits y documentación en español.
- Commits: conventional commits en español cuando aporten claridad (`docs:`, `feat:`, `fix:`, `chore:`).
- Tipografía: una serif para el cuerpo, sans-serif del sistema para la UI. Decisión final en feature 000.

## No hagas

- **No instalar dependencias sin justificarlo** en el commit o en la feature correspondiente.
- **No copiar código de `referente-de-diseno/` directamente** a `src/`. Si se reutiliza, se reescribe limpio.
- **No incluir `referente-de-diseno/` en el build de Astro**. La config de Astro debe excluir ese directorio. El referente **sí está en el repo** como archivo histórico, pero no se sirve al público.
- **No añadir frameworks de UI pesados** (Tailwind, Bootstrap, etc.) sin discutirlo en una feature. La constitución es "CSS plano hasta nuevo aviso".
- **No añadir analítica invasiva** (Google Analytics, Meta Pixel, etc.) en esta primera fase.
- **No subir `.env*`** ni credenciales al repo.
- **No fusionar `referente-de-diseno/` con `src/`** ni reorganizar el árbol sin aprobación explícita.
- **No inventar resultados.** Si un comando falla, decirlo y proponer alternativa. Si una decisión de diseño es ambigua, preguntar antes de avanzar.

## Flujo de trabajo

1. Antes de una tarea no trivial, propón un plan y espera el OK de Camilo.
2. Una tarea a la vez. Al terminar, detalla qué cambiaste para revisión.
3. Si la certeza es menor al 80%, pregunta. No inventes.
4. Cualquier cambio que toque el deploy, el schema de posts o el diseño visual requiere aprobación explícita.
5. El desarrollo se realiza en la rama `main` directamente (proyecto personal, no hay equipo). Para cambios grandes, se puede usar una rama de feature.
6. Al completar una feature y validar sus criterios de aceptación, pregunta explícitamente si se desea desplegar. Solo con confirmación se sube a Hostinger.
7. **Bitácora**: al cerrar cada sesión de trabajo, registra en `spec/bitacora.md` una entrada con la fecha y el avance de la sesión (qué se hizo, qué quedó pendiente, decisiones tomadas). Entradas nuevas arriba.
8. **README siempre actualizado**: en la misma sesión, actualiza `README.md` cuando el trabajo cambie el estado de una feature, las funcionalidades disponibles, el stack, la arquitectura, los requisitos, la instalación, los comandos o el proceso de despliegue. El README es la vista pública y resumida del estado actual.

## Documentación

- `README.md` — presentación pública, instalación rápida y estado actual del proyecto.
- `spec/constitution/mission.md` — qué es el proyecto y para quién.
- `spec/constitution/tech-stack.md` — stack y por qué.
- `spec/constitution/roadmap.md` — orden de las features.
- `spec/features/NNN-nombre/` — spec y plan de cada feature.
- `spec/bitacora.md` — bitácora del desarrollo: una entrada por sesión.
- `spec/deuda-tecnica.md` — atajos registrados a propósito.
- `referente-de-diseno/README.md` — material heredado (referencia, no producción).
