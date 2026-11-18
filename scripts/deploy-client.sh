#!/usr/bin/env bash
set -euo pipefail
export PATH="/root/.nvm/versions/node/v20.20.1/bin:$PATH"
export GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=15"
export NEXT_PUBLIC_API_URL=https://api.electroperedachi.com/api

source_dir=/root/electroperedachi/client
state_dir=/var/lib/electroperedachi-client-deploy
release_root=/root/electroperedachi/client-releases
install -d -m 700 "$state_dir" "$release_root"
exec 9>/run/electroperedachi-client-deploy.lock
flock -n 9 || exit 0
cd "$source_dir"
git fetch --quiet origin refs/heads/cabinet:refs/remotes/origin/cabinet
target=$(git rev-parse origin/cabinet)
deployed=$(cat "$state_dir/deployed" 2>/dev/null || true)
if [[ "$target" = "$deployed" ]]; then
    exit 0
fi
release="$release_root/$target"
if [[ -n "$deployed" && -f "$state_dir/release" ]] &&
   git diff --quiet "$deployed" "$target" -- . ':!scripts/deploy-client.sh' ':!deploy/systemd'; then
    built_release=$(cat "$state_dir/release")
    if [[ -f "$built_release/.deploy-build-complete" ]]; then
        release="$built_release"
    fi
fi
mkdir -p "$release"
if [[ ! -f "$release/.deploy-build-complete" ]]; then
    printf 'Building client %s\n' "$target"
    git archive "$target" | tar -x -C "$release"
    for file in .env .env.local .env.production .env.production.local; do
        if [[ -f "$source_dir/$file" ]]; then
            install -m 600 "$source_dir/$file" "$release/$file"
        fi
    done
    cd "$release"
    npm ci --include=dev
    npm run build
    touch .deploy-build-complete
fi

export CLIENT_DEPLOY_RELEASE="$release"
export CLIENT_DEPLOY_STATE="$state_dir"
pm2 jlist | node -e '
const fs = require("fs")
let input = ""
process.stdin.on("data", chunk => input += chunk)
process.stdin.on("end", () => {
    const processInfo = JSON.parse(input).find(item => item.name === "client")
    if (!processInfo) throw new Error("PM2 client process was not found")
    const current = processInfo.pm2_env
    const config = {
        apps: [{
            name: "client",
            script: current.pm_exec_path,
            args: current.args || ["start"],
            cwd: current.pm_cwd,
            interpreter: current.exec_interpreter || "none",
            env: current.env || {}
        }]
    }
    const state = process.env.CLIENT_DEPLOY_STATE
    fs.writeFileSync(state + "/previous.config.json", JSON.stringify(config), {mode: 0o600})
    config.apps[0].cwd = process.env.CLIENT_DEPLOY_RELEASE
    config.apps[0].env = {
        ...config.apps[0].env,
        NODE_ENV: "production",
        NEXT_PUBLIC_API_URL: "https://api.electroperedachi.com/api"
    }
    fs.writeFileSync(state + "/ecosystem.config.json", JSON.stringify(config), {mode: 0o600})
})
'

pm2 delete client
pm2 start "$state_dir/ecosystem.config.json" --only client
healthy=false
for attempt in {1..30}; do
    if curl --fail --silent --max-time 10 http://127.0.0.1:3000/account > "$state_dir/health.html"; then
        chunk=$(node -e 'const fs=require("fs");const html=fs.readFileSync(process.argv[1],"utf8");const match=html.match(/src="([^"]*\/_next\/static\/[^"]+\.js)"/);if(match)process.stdout.write(match[1])' "$state_dir/health.html")
        if [[ -n "$chunk" ]] && curl --fail --silent --max-time 10 --output /dev/null "http://127.0.0.1:3000$chunk"; then
            healthy=true
            break
        fi
    fi
    sleep 2
done

if [[ "$healthy" != true ]]; then
    printf 'Client health check failed. Restoring previous release.\n' >&2
    pm2 delete client || true
    pm2 start "$state_dir/previous.config.json" --only client
    exit 1
fi
pm2 save
printf '%s\n' "$release" > "$state_dir/release"
printf '%s\n' "$target" > "$state_dir/deployed.tmp"
mv "$state_dir/deployed.tmp" "$state_dir/deployed"
printf 'Client deployed successfully: %s\n' "$target"
