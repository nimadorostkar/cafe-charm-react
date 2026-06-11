#!/usr/bin/env bash
# Deploy script for cafe-charm-react (TanStack Start + Nitro, node-server preset)
# Run this ON the server: ssh root@45.159.113.73 -p3031  then paste/run this file.
set -euo pipefail

APP_NAME="cafe-charm"
REPO="https://github.com/nimadorostkar/cafe-charm-react.git"
APP_DIR="/opt/${APP_NAME}"
PORT="${PORT:-3000}"          # app listens here
NODE_MAJOR=22

echo "==> 1/6 Ensure Node ${NODE_MAJOR}+ and git are installed"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | sed 's/v\([0-9]*\).*/\1/')" -lt "$NODE_MAJOR" ]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
command -v git >/dev/null 2>&1 || apt-get install -y git
node -v && npm -v

echo "==> 2/6 Clone or update repo at ${APP_DIR}"
if [ -d "${APP_DIR}/.git" ]; then
  git -C "${APP_DIR}" fetch --all && git -C "${APP_DIR}" reset --hard origin/HEAD
else
  rm -rf "${APP_DIR}"
  git clone "${REPO}" "${APP_DIR}"
fi
cd "${APP_DIR}"

echo "==> 3/6 Install dependencies"
npm ci 2>/dev/null || npm install

echo "==> 4/6 Build"
npm run build   # outputs .output/server/index.mjs

echo "==> 5/6 Install PM2 and (re)start the app on port ${PORT}"
command -v pm2 >/dev/null 2>&1 || npm install -g pm2
pm2 delete "${APP_NAME}" 2>/dev/null || true
PORT="${PORT}" pm2 start ".output/server/index.mjs" --name "${APP_NAME}" --update-env
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

echo "==> 6/6 Done"
echo "App running under PM2 as '${APP_NAME}' on port ${PORT}."
echo "Test:  curl -I http://127.0.0.1:${PORT}/"
echo "Logs:  pm2 logs ${APP_NAME}"
echo "If you want it on http://45.159.113.73 (port 80), set up the nginx block below."
