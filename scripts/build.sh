#!/bin/sh
# Assemble deux sites autonomes à partir du dépôt :
#   dist/hangar        → site Netlify « hangar-le-fumoir »
#   dist/casse-croute  → site Netlify « casse-croute-hangar »
# Les liens entre les deux sites deviennent des URL absolues.
set -eu
SRC=${SRC:-.}
OUT=${OUT:-dist}
HANGAR_URL=${HANGAR_URL:-https://hangar-le-fumoir.netlify.app}
CC_URL=${CC_URL:-https://casse-croute-hangar.netlify.app}

rm -rf "$OUT"
H="$OUT/hangar"; C="$OUT/casse-croute"
mkdir -p "$H/assets/css" "$H/assets/js" "$H/assets/img/photos" \
         "$C/assets/css" "$C/assets/js" "$C/assets/img/photos"

# ---------- Le Hangar Fumoir ----------
cp "$SRC/index.html" "$SRC/confidentialite.html" "$H/"
cp "$SRC"/netlify/hangar/* "$H/"
cp "$SRC/netlify/hangar/_headers" "$SRC/netlify/hangar/_redirects" "$H/"
cp "$SRC/assets/css/style.css" "$SRC/assets/css/texan.css" "$H/assets/css/"
cp "$SRC/assets/js/config.js" "$SRC/assets/js/i18n.js" "$SRC/assets/js/main.js" "$H/assets/js/"
cp "$SRC/assets/img/logo-hangar.png" "$SRC/assets/img/logo.svg" "$SRC/assets/img/logo-cc.svg" "$SRC/assets/img/favicon.svg" "$H/assets/img/"
cp "$SRC/assets/img/photos/planche.jpg" "$SRC/assets/img/photos/pitmaster.jpg" \
   "$SRC/assets/img/photos/boutique.jpg" "$SRC/assets/img/photos/og.jpg" "$H/assets/img/photos/"
sed -i "s#href=\"casse-croute/#href=\"$CC_URL/#g" "$H/index.html"

# ---------- Casse-Croûte du Hangar ----------
cp "$SRC/casse-croute/index.html" "$SRC/casse-croute/confidentialite.html" \
   "$SRC/casse-croute/cc.css" "$SRC/casse-croute/config.js" "$SRC/casse-croute/i18n-cc.js" "$C/"
cp "$SRC"/netlify/casse-croute/* "$C/"
cp "$SRC/netlify/casse-croute/_headers" "$C/"
cp "$SRC/assets/css/style.css" "$C/assets/css/"
cp "$SRC/assets/js/i18n.js" "$SRC/assets/js/main.js" "$C/assets/js/"
cp "$SRC/assets/img/logo-cc.svg" "$SRC/assets/img/logo.svg" "$SRC/assets/img/favicon-cc.svg" "$C/assets/img/"
cp "$SRC/assets/img/photos/cc-poutine.jpg" "$SRC/assets/img/photos/cc-burger.jpg" \
   "$SRC/assets/img/photos/cc-mac-cheese.jpg" "$SRC/assets/img/photos/planche.jpg" \
   "$SRC/assets/img/photos/og-cc.jpg" "$C/assets/img/photos/"
for f in "$C/index.html" "$C/confidentialite.html"; do
  sed -i -e "s#href=\"\.\./\"#href=\"$HANGAR_URL/\"#g" -e 's#\.\./assets/#assets/#g' "$f"
done

# ---------- Garde-fou ----------
if grep -nE '(href|src)="(\.\./|casse-croute/)' "$H"/*.html "$C"/*.html; then
  echo "ERREUR : chemin relatif inter-sites restant" >&2; exit 1
fi
echo "OK : $H et $C prêts"
