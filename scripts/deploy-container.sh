#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/app}"
REPO_URL="${REPO_URL:-https://github.com/hhkb-ai/apiuspro.git}"
REPO_BRANCH="${REPO_BRANCH:-main}"
SOURCE_DIR="${SOURCE_DIR:-}"

resolve_dir() {
  local dir="$1"
  mkdir -p "$dir"
  cd "$dir"
  pwd -P
}

APP_DIR="$(resolve_dir "$APP_DIR")"

if [ "$APP_DIR" != "/app" ]; then
  echo "Refusing to deploy outside /app: $APP_DIR" >&2
  exit 1
fi

TMP_DIR="$(mktemp -d /tmp/apiuspro-deploy.XXXXXX)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

if [ -n "$SOURCE_DIR" ]; then
  SOURCE_DIR="$(cd "$SOURCE_DIR" && pwd -P)"
else
  SOURCE_DIR="$TMP_DIR/repo"
  git clone --depth 1 --branch "$REPO_BRANCH" "$REPO_URL" "$SOURCE_DIR"
fi

echo "Syncing source into $APP_DIR..."
find "$APP_DIR" -mindepth 1 -maxdepth 1 \
  ! -name node_modules \
  ! -name .pnpm-store \
  ! -name .env \
  ! -name .env.local \
  ! -name .env.production \
  ! -name logs \
  -exec rm -rf {} +

cp -a "$SOURCE_DIR"/. "$APP_DIR"/

cd "$APP_DIR"

if command -v corepack >/dev/null 2>&1; then
  corepack enable
  corepack pnpm build
else
  pnpm build
fi

export NODE_ENV="${NODE_ENV:-production}"
export COZE_PROJECT_ENV="${COZE_PROJECT_ENV:-PROD}"

echo "Starting APIusPro server..."
exec node dist/server.js
