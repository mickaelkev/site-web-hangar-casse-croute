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
mkdir -p "$H/assets/css" "$H/assets/js" "$H/assets/img/photos" "$H/assets/fonts" \
         "$C/assets/css" "$C/assets/js" "$C/assets/img/photos" "$C/assets/fonts"
cp "$SRC"/assets/fonts/*.woff2 "$H/assets/fonts/"
cp "$SRC"/assets/fonts/*.woff2 "$C/assets/fonts/"

# ---------- Le Hangar Fumoir ----------
cp "$SRC/index.html" "$SRC/confidentialite.html" "$H/"
cp "$SRC"/netlify/hangar/* "$H/"
cp "$SRC/assets/css/style.css" "$SRC/assets/css/texan.css" "$H/assets/css/"
cp "$SRC/assets/js/config.js" "$SRC/assets/js/i18n.js" "$SRC/assets/js/main.js" "$SRC/assets/js/reviews.js" "$H/assets/js/"
cp "$SRC/assets/img/logo-hangar.png" "$SRC/assets/img/logo-hangar-192.png" "$SRC/assets/img/logo.svg" "$SRC/assets/img/logo-cc-v3.svg" "$SRC/assets/img/favicon.svg" "$H/assets/img/"
cp "$SRC/assets/img/photos/og.jpg" "$H/assets/img/photos/"
for n in planche pitmaster boutique; do cp "$SRC"/assets/img/photos/$n* "$H/assets/img/photos/"; done
sed -i "s#href=\"casse-croute/#href=\"$CC_URL/#g" "$H/index.html"

# ---------- Casse-Croûte du Hangar ----------
cp "$SRC/casse-croute/index.html" "$SRC/casse-croute/confidentialite.html" \
   "$SRC/casse-croute/cc.css" "$SRC/casse-croute/config.js" "$SRC/casse-croute/i18n-cc.js" "$SRC/casse-croute/reviews.js" "$C/"
cp "$SRC"/netlify/casse-croute/* "$C/"
cp "$SRC/assets/css/style.css" "$C/assets/css/"
cp "$SRC/assets/js/i18n.js" "$SRC/assets/js/main.js" "$C/assets/js/"
cp "$SRC/assets/img/logo-cc-v3.svg" "$SRC/assets/img/logo.svg" "$SRC/assets/img/favicon-cc-v2.svg" "$C/assets/img/"
cp "$SRC/assets/img/photos/og-cc.jpg" "$SRC/assets/img/photos/planche.jpg" "$C/assets/img/photos/"
for n in cc-poutine cc-burger cc-mac-cheese planche-45; do cp "$SRC"/assets/img/photos/$n* "$C/assets/img/photos/"; done
for f in "$C/index.html" "$C/confidentialite.html"; do
  sed -i -e "s#href=\"\.\./\"#href=\"$HANGAR_URL/\"#g" -e 's#\.\./assets/#assets/#g' "$f"
done

# ---------- Garde-fou ----------
if grep -nE '(href|src)="(\.\./|casse-croute/)' "$H"/*.html "$C"/*.html; then
  echo "ERREUR : chemin relatif inter-sites restant" >&2; exit 1
fi
echo "OK : $H et $C prêts"
