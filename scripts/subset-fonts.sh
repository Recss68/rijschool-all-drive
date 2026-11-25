#!/usr/bin/env bash
# Rebuilds static/fonts/*.woff2 from the full variable fonts in fonts-source/.
# The served files only hold Latin-1 plus the punctuation, euro sign and arrows the site uses,
# and the weights 300-800, which cuts the critical font bytes on mobile by about 60%.
# DM Sans is pinned to optical size 14 (body text); Bricolage keeps its optical sizes for headings.
# Needs fonttools: pip install fonttools brotli
set -euo pipefail
cd "$(dirname "$0")/.."

UNICODES='U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201E,U+2022,U+2026,U+20AC,U+2122,U+2190-2193,U+2197,U+2713'
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

fonttools varLib.instancer fonts-source/bricolage-grotesque.woff2 wght=300:800 wdth=100 -q -o "$tmp/bricolage.ttf"
fonttools varLib.instancer fonts-source/dmsans.woff2 wght=300:800 opsz=14 -q -o "$tmp/dmsans.ttf"

pyftsubset "$tmp/bricolage.ttf" --unicodes="$UNICODES" --layout-features='*' --flavor=woff2 \
	--output-file=static/fonts/bricolage-grotesque.woff2
pyftsubset "$tmp/dmsans.ttf" --unicodes="$UNICODES" --layout-features='*' --flavor=woff2 \
	--output-file=static/fonts/dmsans.woff2

ls -l static/fonts
