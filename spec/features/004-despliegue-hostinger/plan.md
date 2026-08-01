# 004 · Despliegue en Hostinger — Plan

1. Confirmar dominio, acceso y mecanismo de publicación.
2. Configurar `site` y trailing slash.
3. Generar y previsualizar `dist/`.
4. Revisar el contenido exacto que se publicará.
5. Solicitar aprobación explícita.
6. Subir el build a Hostinger.
7. Verificar HTTPS, rutas, metadatos y 404.
8. Documentar actualización y rollback.

## Decisiones

- Se publica únicamente `dist/`.
- Las credenciales viven fuera del repositorio.
- No se automatiza el despliegue hasta que el flujo manual sea estable.
