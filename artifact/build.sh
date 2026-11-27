#!/usr/bin/env bash
# Construit la version Artifact (un seul fichier HTML) dans artifact/dist/philosophe.html
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p artifact/dist
node artifact/build.mjs
npx @tailwindcss/cli -i src/app/globals.css -o artifact/dist/app.css --minify 2>/dev/null
python3 artifact/assemble.py artifact/dist
echo "→ artifact/dist/philosophe.html"
