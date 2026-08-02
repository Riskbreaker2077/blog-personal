# 004 · Despliegue en Hostinger — Tareas

- [x] Confirmar dominio y acceso: subdominio `blog.morenocaro.com` creado, subida por SSH + `rsync`.
- [x] Configurar URL y trailing slash: `directory` + `always` en `astro.config.mjs`.
- [x] Validar build. **Falta que Camilo mire `npm run preview`**, que desde WSL no es alcanzable.
- [x] Auditar `dist/`: sin borradores, sin referente y sin credenciales. 31 archivos y 480 KB en la publicación real.
- [x] Pedir aprobación de despliegue. Concedida el 2 de agosto de 2026.
- [x] Publicar en Hostinger. Ejecutado el 2 de agosto de 2026: 29 archivos, 473 KB, un solo borrado (`default.php`).
- [x] Verificar HTTPS y rutas: diez rutas en 200 y `301` de `http` a `https`.
- [x] Verificar RSS, sitemap, canonical y 404 en producción. Todo correcto; el feed estrenó `rss.xsl` para poder leerse en un navegador.
- [x] Documentar actualización y rollback en `spec/despliegue.md`.
- [x] Actualizar roadmap, README y bitácora.
