#!/usr/bin/env node
import { existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtimeDir = join(repoRoot, '.codex-preview');
const pidFile = join(runtimeDir, 'preview.pid');
const outLog = join(runtimeDir, 'preview.out.log');
const errLog = join(runtimeDir, 'preview.err.log');
const launcherFile = join(runtimeDir, 'start-preview.cmd');
const port = Number(process.env.PORT || 5000);
const url = `http://127.0.0.1:${port}/`;
const command = process.argv[2] || 'start';

mkdirSync(runtimeDir, { recursive: true });

function readPid() {
  if (!existsSync(pidFile)) return null;
  const value = Number(readFileSync(pidFile, 'utf8').trim());
  return Number.isInteger(value) && value > 0 ? value : null;
}

function isProcessAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function getPortPid() {
  if (process.platform !== 'win32') return null;
  const result = spawnSync('netstat', ['-ano', '-p', 'tcp'], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  const line = result.stdout
    .split(/\r?\n/)
    .find((item) => /\sLISTENING\s/.test(item) && new RegExp(`(?:0\\.0\\.0\\.0|127\\.0\\.0\\.1|\\[::\\]):${port}\\s`).test(item));
  if (!line) return null;
  const pid = Number(line.trim().split(/\s+/).at(-1));
  return Number.isInteger(pid) && pid > 0 ? pid : null;
}

async function isReady() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return res.status >= 200 && res.status < 500;
  } catch {
    return false;
  }
}

async function waitUntilReady(timeoutSeconds = 60) {
  const deadline = Date.now() + timeoutSeconds * 1000;
  while (Date.now() < deadline) {
    if (await isReady()) return true;
    await new Promise((resolveWait) => setTimeout(resolveWait, 1000));
  }
  return false;
}

function start() {
  const existingPid = readPid();
  if (isProcessAlive(existingPid)) {
    console.log(`Preview process already running: ${existingPid}`);
    return existingPid;
  }

  const tsxCli = join(repoRoot, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  if (!existsSync(tsxCli)) {
    console.error('Missing node_modules/tsx. Run pnpm install first.');
    process.exit(1);
  }

  const stdout = openSync(outLog, 'a');
  const stderr = openSync(errLog, 'a');
  const child = spawn(process.execPath, [tsxCli, 'watch', 'src/server.ts'], {
    cwd: repoRoot,
    detached: true,
    env: {
      ...process.env,
      PORT: String(port),
      COZE_PROJECT_ENV: process.env.COZE_PROJECT_ENV || 'DEV',
    },
    stdio: ['ignore', stdout, stderr],
    windowsHide: true,
  });

  writeFileSync(pidFile, String(child.pid));
  child.unref();
  console.log(`Preview started: pid=${child.pid}`);
  return child.pid;
}

function writeWindowsLauncher() {
  const tsxCli = join(repoRoot, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  const content = [
    '@echo off',
    `cd /d "${repoRoot}"`,
    `set "PORT=${port}"`,
    'set "COZE_PROJECT_ENV=DEV"',
    `"${process.execPath}" "${tsxCli}" watch src/server.ts >> "${outLog}" 2>> "${errLog}"`,
    '',
  ].join('\r\n');
  writeFileSync(launcherFile, content);
  console.log(`Launcher written: ${launcherFile}`);
}

function serve() {
  const tsxCli = join(repoRoot, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  if (!existsSync(tsxCli)) {
    console.error('Missing node_modules/tsx. Run pnpm install first.');
    process.exit(1);
  }

  console.log(`Preview serving at ${url}`);
  const child = spawn(process.execPath, [tsxCli, 'watch', 'src/server.ts'], {
    cwd: repoRoot,
    env: {
      ...process.env,
      PORT: String(port),
      COZE_PROJECT_ENV: process.env.COZE_PROJECT_ENV || 'DEV',
    },
    stdio: 'inherit',
    windowsHide: false,
  });

  child.on('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code || 0);
  });
}

function stop() {
  const pid = readPid() || getPortPid();
  if (!pid || !isProcessAlive(pid)) {
    console.log('Preview process is not running.');
    return;
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    process.kill(-pid, 'SIGTERM');
  }
  console.log(`Preview stopped: pid=${pid}`);
}

function tail(file, lineCount = 80) {
  if (!existsSync(file)) return '';
  return readFileSync(file, 'utf8').split(/\r?\n/).slice(-lineCount).join('\n');
}

async function main() {
  if (command === 'stop') {
    stop();
    return;
  }

  if (command === 'serve') {
    serve();
    return;
  }

  if (command === 'logs') {
    console.log(tail(outLog));
    console.error(tail(errLog));
    return;
  }

  if (command === 'launcher') {
    writeWindowsLauncher();
    return;
  }

  if (command === 'status') {
    const pid = readPid();
    const portPid = getPortPid();
    console.log(JSON.stringify({ pid, portPid, alive: isProcessAlive(pid) || isProcessAlive(portPid), ready: await isReady(), url }, null, 2));
    return;
  }

  if (command !== 'start') {
    console.error('Usage: node scripts/quick-preview.mjs [start|serve|status|stop|logs|launcher]');
    process.exit(2);
  }

  if (!(await isReady())) start();
  const ready = await waitUntilReady(Number(process.env.PREVIEW_TIMEOUT || 60));
  if (!ready) {
    console.error(`Preview did not become ready within timeout. Logs: ${outLog}, ${errLog}`);
    process.exit(1);
  }
  console.log(`Preview ready: ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
