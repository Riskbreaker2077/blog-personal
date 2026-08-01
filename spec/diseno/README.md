# Diseño

_Material de referencia visual y estructural para el blog. **No es parte del blog en producción**; se conserva para consulta y comparación durante el desarrollo._

## Origen

El referente vive en `../referente-de-diseno/` (un nivel arriba de esta carpeta). Contiene:

- **`prototipo-visual/`** — Mockup previo hecho en HTML/JSX/React (`Blog.html`, `app.jsx`, `screens.jsx`, `tweaks-panel.jsx`, `image-slot.js`, `data.js`) + carpeta `uploads/` con las imágenes usadas en ese prototipo.
- **`astro-base/`** — Esqueleto funcional en Astro (componentes, layouts, páginas, estilos) **sin contenido**. Los posts originales eran mockups de prueba y se omitieron a propósito.

## Cómo se usa

- **Para inspirarse en la estructura**, mirar `referente-de-diseno/astro-base/`. Sirve de mapa mental de qué archivos existen en un proyecto Astro.
- **Para validar decisiones de UI** (paleta, layout, tipografía), mirar las imágenes en `referente-de-diseno/prototipo-visual/uploads/`.
- **Para entender decisiones de interacción** (cómo se ve un slider de "tweaks", cómo se navega entre pantallas), mirar `prototipo-visual/Blog.html` y los `.jsx`.
- **Como dirección aprobada**, consultar [`direccion-visual.md`](direccion-visual.md), que traduce el referente a reglas de producción.

## Lo que NO se hace

- No se copia código del referente directamente a `src/`. Si algo se reutiliza, se reescribe limpio.
- No se incluye `referente-de-diseno/` en el build. Permanece versionado y no se añade a `.gitignore`; producción simplemente no lo importa ni lo copia.
- No se editan los archivos del referente como parte del trabajo de una feature. El referente es solo lectura.

## Notas

- En `uploads/` había dos imágenes bit-exact (mismo MD5). Se eliminó el duplicado conservando la original.
- El contenido de los posts Astro del ZIP **no se incluye** porque eran material de prueba, no contenido editorial real.
