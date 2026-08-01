# 000 · Fundamento visual y técnico — Plan

## Enfoque

Inicializar Astro 5 desde cero y reescribir una implementación limpia inspirada en el referente. No se copia código desde `referente-de-diseno/`.

## Implementación

1. Inicializar Astro y fijar una versión 5.x exacta.
2. Configurar TypeScript estricto, pnpm, ESLint y scripts de validación.
3. Crear `astro.config.mjs` con output estático y dominio provisional documentado.
4. Crear tokens y estilos globales a partir de la dirección visual.
5. Resolver la carga de Newsreader y la monoespaciada elegida con criterio de rendimiento y privacidad.
6. Crear `BaseLayout`, `Topbar` y `Footer`.
7. Crear una portada editorial representativa.
8. Crear la página “Sobre mí” con contenido provisional claramente marcado.
9. Añadir accesibilidad base, responsive y reduced motion.
10. Validar visualmente en móvil y escritorio.
11. Inspeccionar `dist/` para confirmar que el referente no se publicó.

## Decisiones

- Astro permanece en major 5 y se fija exactamente.
- La línea del pensamiento es la firma estructural.
- El fondo principal es papel frío, no crema amarillento.
- El sitio funciona sin modo oscuro en esta fase.
- No se usa `vite.exclude` para el referente.

## Riesgos

- **Astro 5 es una major anterior:** la versión se fija y no se actualiza automáticamente.
- **Fuentes remotas:** se evita depender de `@import` bloqueante; se evalúa alojamiento local o una estrategia de carga explícita.
- **Parecido excesivo al prototipo:** la revisión visual comprueba que se conserva la intención, no una copia literal.
