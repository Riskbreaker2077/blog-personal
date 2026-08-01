# Despliegue

_Cómo se publica el blog en Hostinger y cómo se deshace una publicación. Procedimiento manual y a propósito: no hay CI/CD hasta que este flujo sea aburrido._

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

Ese archivo es de tu máquina y no se versiona.

## Antes de la primera publicación

1. Confirmar la ruta remota del subdominio. Cambia según cómo se creó:

   ```bash
   ssh hostinger-blog "ls -d ~/domains/*/public_html"
   ```

   Lo habitual es `~/domains/blog.morenocaro.com/public_html`. Esa ruta es `$DESTINO` de aquí en adelante.

2. Comprobar que la carpeta está vacía o solo tiene el `index.html` de bienvenida de Hostinger.

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

## Verificar

Después de publicar, desde cualquier terminal:

```bash
curl -sI https://blog.morenocaro.com/            | head -1   # 200
curl -sI https://blog.morenocaro.com/archivo     | head -1   # 301 hacia /archivo/
curl -sI https://blog.morenocaro.com/no-existe/  | head -1   # 404
curl -s  https://blog.morenocaro.com/rss.xml     | head -c 200
curl -s  https://blog.morenocaro.com/sitemap-index.xml
curl -s  https://blog.morenocaro.com/ | grep -o '<link rel="canonical"[^>]*>'
```

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
