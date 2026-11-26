#!/usr/bin/env bash
# Construit la version Artifact (un seul fichier HTML) dans artifact/dist/philosophe.html
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p artifact/dist
npx esbuild artifact/main.tsx --bundle --minify --format=iife --jsx=automatic --target=es2020 \
  --alias:next/link=./artifact/shims/link.tsx --alias:next/navigation=./artifact/shims/navigation.ts \
  --define:process.env.NODE_ENV='"production"' --tsconfig=tsconfig.json --outfile=artifact/dist/app.js --log-level=warning
npx @tailwindcss/cli -i src/app/globals.css -o artifact/dist/app.css --minify 2>/dev/null
python3 artifact/assemble.py artifact/dist
echo "→ artifact/dist/philosophe.html"
