#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

AUTHOR="SmarterLogicWeb"
YEAR="2025"
WEBSITE="https://smarterlogicweb.com"
LICENSE="MIT"

# Directories to skip
SKIP_DIRS=("node_modules" "dist" "build" ".git" "coverage" ".husky" ".vscode" ".github" "public/images" "public/assets")

# File patterns to process
EXT_JS=("js" "jsx" "ts" "tsx" "mjs" "cjs")
EXT_CSS=("css" "scss")

has_header() {
  local file="$1"
  head -n 10 "$file" 2>/dev/null | grep -q "SmarterLogicWeb"
}

add_js_header() {
  local file="$1"
  local desc="File generated or maintained by SmarterLogicWeb"
  local header="/**
 * @file ${desc}
 * @author ${AUTHOR}
 * @copyright ${YEAR} ${AUTHOR}. All rights reserved.
 * @license ${LICENSE}
 * @see ${WEBSITE}
 */"
  # Preserve shebang if present
  if head -n1 "$file" | grep -q "^#\!"; then
    {
      head -n1 "$file"
      echo "$header"
      tail -n +2 "$file"
    } >"${file}.tmp" && mv "${file}.tmp" "$file"
  else
    printf "%s\n%s" "$header" "$(cat "$file")" >"${file}.tmp" && mv "${file}.tmp" "$file"
  fi
}

add_css_header() {
  local file="$1"
  local header="/**
 * [Styles maintained by SmarterLogicWeb]
 * @author ${AUTHOR}
 * @copyright ${YEAR} ${AUTHOR}. All rights reserved.
 * @see ${WEBSITE}
 */"
  printf "%s\n%s" "$header" "$(cat "$file")" >"${file}.tmp" && mv "${file}.tmp" "$file"
}

should_skip_dir() {
  local path="$1"
  for d in "${SKIP_DIRS[@]}"; do
    if [[ "$path" == *"/$d/"* || "$path" == *"/$d" ]]; then
      return 0
    fi
  done
  return 1
}

process_file() {
  local file="$1"
  local ext="${file##*.}"

  if should_skip_dir "$file"; then
    return
  fi
  if has_header "$file"; then
    return
  fi

  for e in "${EXT_JS[@]}"; do
    if [[ "$ext" == "$e" ]]; then
      add_js_header "$file"
      echo "Header added (JS/TS): $file"
      return
    fi
  done

  for e in "${EXT_CSS[@]}"; do
    if [[ "$ext" == "$e" ]]; then
      add_css_header "$file"
      echo "Header added (CSS): $file"
      return
    fi
  done
}

export -f has_header add_js_header add_css_header should_skip_dir process_file

# Find files and process
find "$ROOT_DIR" \
  -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.css" -o -name "*.scss" \) \
  | while read -r f; do
      process_file "$f"
    done

echo "Done. Headers applied where missing."