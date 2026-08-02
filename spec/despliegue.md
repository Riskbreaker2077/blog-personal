# Despliegue

_Cómo se publica el blog en Hostinger y cómo se deshace una publicación. Procedimiento manual y a propósito: no hay CI/CD hasta que este flujo sea aburrido._

> **El sitio está en línea desde el 2 de agosto de 2026.** La primera publicación está contada paso a paso en la [sesión 10 de la bitácora](bitacora.md), incluidos los tropiezos.

## Lo esencial

| Qué | Valor |
|---|---|
| Dominio | `https://blog.morenocaro.com` |
| Hosting | Hostinger (LiteSpeed, compatible con Apache) |
| Mecanismo | SSH + `rsync` desde WSL |
| Qué se publica | **solo el contenido de `dist/`**, nunca el repositorio |
| Quién aprueba | Camilo, explícitamente, en cada publicación |

Lo que **no** sale de la máquina: `src/`, `spec/`, `referente-de-diseno/`, `node_modules/`, `.git/`. Nada de eso tiene por qué estar en un servidor público.

## Credenciales

Viven **fuera del repositorio**. El host, el usuario y el puerto están en hPanel → _Avanzado → Acceso SSH_. Hostinger usa un puerto no estándar (normalmente `65002`), no el 22.

Conviene subir una clave pública en esa misma pantalla y olvidarse de la contraseña:

```bash
ssh-keygen -t ed25519 -C "blog-personal"   # si aún no tienes clave
cat ~/.ssh/id_ed25519.pub                  # esto se pega en hPanel
```

Para no repetir host y puerto en cada comando, en `~/.ssh/config`:

```
Host hostinger-blog
  HostName <ip-o-host-de-hpanel>
  User <uXXXXXXXXX>
  Port 65002
  IdentityFile ~/.ssh/id_ed25519
```

Ese archivo es de tu máquina y no se versiona. **En la documentación solo aparece el alias `hostinger-blog`**: la IP, el usuario y el puerto no entran al repositorio, que es público.

Dos cosas que costaron un rato la primera vez:

- `chmod 600 ~/.ssh/config`. Si el archivo es legible por otros, SSH lo ignora y falla sin explicar por qué.
- Comprobar que `~/.ssh/config` es un **archivo**. En la primera publicación existía como carpeta vacía y ningún intento de escribirlo funcionaba. Se arregla con `rmdir ~/.ssh/config`.

Prueba de que todo está en su sitio:

```bash
ssh hostinger-blog "pwd"
```

Si pide contraseña, la clave pública no quedó registrada en hPanel.

## Antes de la primera publicación

_Hecho el 2 de agosto de 2026. Se conserva por si algún día hay que repetirlo en otro dominio._

1. Confirmar la ruta remota del subdominio. Cambia según cómo se creó:

   ```bash
   ssh hostinger-blog "ls -d ~/domains/*/public_html"
   ```

   La cuenta aloja varios dominios; el del blog resultó ser `~/domains/blog.morenocaro.com/public_html`. Esa ruta es `$DESTINO` de aquí en adelante. **Que la ruta sea exacta es lo que garantiza que `--delete` no toque los otros sitios de la cuenta.**

2. Comprobar que la carpeta está vacía o solo tiene la página de bienvenida de Hostinger (`default.php` en nuestro caso, que la primera publicación borró).

3. Activar **Forzar HTTPS** en hPanel. No se hace por `.htaccess` a propósito: duplicar la redirección detrás del proxy de Hostinger provoca bucles.

## Publicar

Desde la raíz del proyecto, en WSL:

```bash
# 1. Construir. Ojo: el build va por el Node de Windows.
cmd.exe /c "node_modules\.bin\astro.cmd build"

# 2. Mirar qué cambiaría, sin tocar nada.
rsync -avzn --delete \
  --exclude '.well-known/' \
  dist/ hostinger-blog:~/domains/blog.morenocaro.com/public_html/

# 3. Publicar de verdad, guardando lo que se reemplaza.
rsync -avz --delete \
  --exclude '.well-known/' \
  --backup --backup-dir="../backup-$(date +%Y%m%d-%H%M)" \
  dist/ hostinger-blog:~/domains/blog.morenocaro.com/public_html/
```

Tres detalles que importan:

- **La barra final de `dist/`**. Sin ella rsync crea `public_html/dist/` y el sitio no aparece.
- **`-n` en el paso 2** es el simulacro. Léelo antes de correr el paso 3.
- **`--delete`** borra en el servidor lo que ya no está en `dist/`. Es lo que evita que sobrevivan páginas de versiones viejas. `--exclude '.well-known/'` protege la validación de certificados.

Y un detalle del entorno: **el paso 3 puede quedar bloqueado si lo lanza un agente**, porque escribe y borra en una máquina remota. En ese caso lo ejecuta Camilo desde su terminal, o con el prefijo `!` en la sesión. Los pasos 1 y 2 no tienen ese problema.

Antes del paso 3, **commitear**. Publicar con el árbol sucio deja el sitio en un estado que no corresponde a ningún commit, y el rollback por reconstrucción deja de existir.

## Verificar

Después de publicar, desde cualquier terminal:

```bash
# Todas las rutas de una vez: código, tipo y tamaño.
for u in / /archivo/ /sobre/ /temas/filosofia/ /posts/las-maquinas-de-escribir/ \
         /rss.xml /sitemap-index.xml /robots.txt /og.jpg /no-existe/; do
  printf "%-38s " "$u"
  curl -sS -o /dev/null -w "%{http_code}  %{content_type}\n" "https://blog.morenocaro.com$u"
done

# HTTPS forzado: debe dar 301 hacia https.
curl -sS -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://blog.morenocaro.com/

# Metadatos y caché.
curl -sS https://blog.morenocaro.com/ | grep -oE '<link rel="canonical"[^>]*>|<meta property="og:image"[^>]*>'
curl -sS https://blog.morenocaro.com/no-existe/ | grep -o '<meta name="robots"[^>]*>'
curl -sSI https://blog.morenocaro.com/_astro/*.css | grep -i cache-control   # immutable
```

Lo que devolvió la primera publicación: diez rutas en 200 (la última en 404, como debe), `301` de `http` a `https`, canonical con barra final, `noindex, follow` en la 404 y `max-age=31536000, immutable` en los assets —señal de que el `.htaccess` llegó y se aplicó.

Y a ojo, en el navegador:

- La 404 es la tuya («Aquí no hay nada escrito»), no la genérica del hosting.
- El candado de HTTPS, sin advertencia de contenido mixto.
- Un post directo, sin pasar por el índice: `https://blog.morenocaro.com/posts/las-maquinas-de-escribir/`.
- El modo oscuro y el cambio de tema.

## Rollback

Cada publicación deja lo reemplazado en `~/domains/blog.morenocaro.com/backup-AAAAMMDD-HHMM/`. Para volver atrás:

```bash
ssh hostinger-blog
cd ~/domains/blog.morenocaro.com
ls -d backup-*                       # elegir el más reciente que servía
rsync -a backup-20260801-1830/ public_html/
```

Si el problema es el build y no el servidor, la vía corta es reconstruir desde el commit bueno y volver a publicar:

```bash
git log --oneline -10
git checkout <commit> -- src/ astro.config.mjs
cmd.exe /c "node_modules\.bin\astro.cmd build"
# y repetir el paso 3
```

Conviene borrar los backups viejos de vez en cuando: ocupan lo mismo que el sitio.

## Publicar un texto nuevo

1. Escribir o editar el `.md` en `src/content/posts/`.
2. `npm run dev` y revisar en `http://localhost:4321/`.
3. `git commit`.
4. Build, simulacro, publicación (los tres comandos de arriba).
5. Verificar que el texto aparece en el índice, en su tema, en el archivo y en `/rss.xml`.

## Cosas que parecen rotas y no lo están

| Síntoma | Qué pasa de verdad |
|---|---|
| `/rss.xml` sale como un muro de XML | El navegador no sabe qué hacer con un feed. Se resolvió con `public/rss.xsl`, que solo aplica el navegador: los lectores de RSS la ignoran |
| Un post editado no cambia en el servidor | El HTML se revalida, pero puede quedar cacheado en tu navegador. Recarga forzada antes de sospechar del despliegue |
| El grafo de la portada no aparece | Es normal bajo 47.5rem de ancho: está oculto en móvil a propósito |
