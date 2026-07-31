# CLAUDE.md

_Instrucciones específicas para Claude Code / agentes de Anthropic._

## Reglas duras

- Antes de tocar código de una feature, verifica que existe su carpeta en `spec/features/NNN-nombre/` con `spec.md`, `plan.md` y `tasks.md`. Si falta, pregunta antes de crearla.
- Lee siempre `spec/constitution/tech-stack.md` antes de proponer dependencias o stacks. La constitución es ley.
- No instales paquetes sin listarlos primero y pedir OK.
- No modifiques `referente-de-diseno/` como parte del trabajo de una feature. Es de solo lectura.
- No modifiques `spec/spec_template/` salvo para mantener sincronizada la plantilla con la convención del proyecto.

## Estilo

- Responde en español, conciso. Sin prosa inflada. Tablas y bullets sobre párrafos.
- Cita rutas y comandos exactos, no resúmenes.
- Si una instrucción entra en conflicto con `spec/constitution/`, gana la constitución. Si no estás seguro, pregunta.
