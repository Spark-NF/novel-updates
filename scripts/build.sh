#!/usr/bin/env bash

tsc -p "src/tsconfig.json"

rollup "src/background/background.js" --o "src/background/bundle.js" --no-treeshake --f esm
rollup "src/popup/popup.js" --o "src/popup/bundle.js" --f esm
rollup "src/sidebar/sidebar.js" --o "src/sidebar/bundle.js" --f esm
