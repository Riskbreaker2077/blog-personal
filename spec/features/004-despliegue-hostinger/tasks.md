# 004 · Despliegue en Hostinger — Tareas

- [x] Confirmar dominio y acceso: subdominio `blog.morenocaro.com` creado, subida por SSH + `rsync`.
- [x] Configurar URL y trailing slash: `directory` + `always` en `astro.config.mjs`.
- [x] Validar build. **Falta que Camilo mire `npm run preview`**, que desde WSL no es alcanzable.
- [x] Auditar `dist/`: 26 archivos, 460 KB, sin borradores, sin referente y sin credenciales.
- [ ] Pedir aprobación de despliegue. **Solicitada el 1 de agosto de 2026.**
- [ ] Publicar en Hostinger. **Bloqueada: la ejecuta Camilo.**
- [ ] Verificar HTTPS y rutas. Depende de la publicación.
- [ ] Verificar RSS, sitemap, canonical y 404 en producción. Depende de la publicación.
- [x] Documentar actualización y rollback en `spec/despliegue.md`.
- [x] Actualizar roadmap, README y bitácora.
