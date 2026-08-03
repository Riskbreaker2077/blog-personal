#!/usr/bin/env bash
#
# Publica el blog en Hostinger: construye, enseña el simulacro, pide permiso y
# sube. Se ejecuta con `npm run publicar`, desde WSL.
#
# Por qué desde WSL: `rsync` y `ssh` viven aquí. Y por qué el build va por
# `cmd.exe`: `node_modules` tiene los binarios de Windows. Las dos mitades del
# entorno hacen falta, cada una para lo suyo.
#
# El procedimiento completo, incluido el rollback, está en spec/despliegue.md.

set -euo pipefail

DESTINO="hostinger-blog:~/domains/blog.morenocaro.com/public_html/"
SITIO="https://blog.morenocaro.com"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$RAIZ"

titulo() { printf '\n\033[1m%s\033[0m\n' "$1"; }
aviso() { printf '\033[33m%s\033[0m\n' "$1"; }
error() { printf '\033[31m%s\033[0m\n' "$1" >&2; }

# Preguntar siempre contra la terminal: si la salida está redirigida, `read` a
# secas leería del pipe y respondería solo.
confirmar() {
  local respuesta
  read -r -p "$1 [s/N] " respuesta </dev/tty
  [[ "$respuesta" =~ ^[sSyY]$ ]]
}

# ── 1. Estado del repositorio ─────────────────────────────────────────────
# Publicar con cambios sin commitear deja el sitio en un estado que no
# corresponde a ningún commit, y el rollback por reconstrucción deja de existir.
if [[ -n "$(git status --porcelain)" ]]; then
  titulo "Hay cambios sin commitear"
  git status --short
  aviso "Si publicas así, no hay commit al que volver si algo sale mal."
  confirmar "¿Seguir de todos modos?" || { error "Cancelado."; exit 1; }
fi

# ── 2. Construir ──────────────────────────────────────────────────────────
titulo "Construyendo"
cmd.exe /c "node_modules\\.bin\\astro.cmd build"

if [[ ! -f dist/index.html ]]; then
  error "El build no dejó dist/index.html. Nada que publicar."
  exit 1
fi

# ── 3. Simulacro ──────────────────────────────────────────────────────────
titulo "Simulacro: esto es lo que cambiaría"
rsync -avzn --delete --exclude '.well-known/' dist/ "$DESTINO"

titulo "Lo que se borraría en el servidor"
if rsync -avzn --delete --exclude '.well-known/' dist/ "$DESTINO" |
  grep '^deleting ' | sed 's/^/  /'; then
  aviso "Revisa la lista de arriba antes de seguir."
else
  echo "  Nada."
fi

# ── 4. Publicar ───────────────────────────────────────────────────────────
confirmar $'\n¿Publicar en '"$SITIO"'?' || { error "Cancelado."; exit 1; }

titulo "Publicando"
rsync -avz --delete --exclude '.well-known/' \
  --backup --backup-dir="../backup-$(date +%Y%m%d-%H%M)" \
  dist/ "$DESTINO"

# ── 5. Verificar ──────────────────────────────────────────────────────────
titulo "Verificando"
for ruta in / /archivo/ /sobre/ /rss.xml /sitemap-index.xml /no-existe/; do
  printf '  %-20s ' "$ruta"
  curl -sS -o /dev/null -w '%{http_code}\n' "$SITIO$ruta" || echo "sin respuesta"
done

printf '  %-20s ' "http -> https"
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' "http://blog.morenocaro.com/"

titulo "Listo"
echo "Todo en 200 menos /no-existe/, que debe dar 404."
echo "Si acabas de cambiar el diseño, mira el sitio con Ctrl+Shift+R."
