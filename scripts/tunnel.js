// scripts/tunnel.mjs (attached mode)
import net from 'net';
import http from 'http';
import { spawn } from 'child_process';
import { setTimeout as wait } from 'timers/promises';

const PROXY_PORT = 6969;
const NGROK_API = 'http://127.0.0.1:4040/api/tunnels';
const NGROK_TUNNEL_NAME = 'beamr'; // must match ngrok.yml
const PROXY_CMD = ['node', ['../beamr-local-proxy/beamr-proxy.js']]; // adjust path if needed
const NGROK_CMD = ['ngrok', ['start', NGROK_TUNNEL_NAME]];

let started = []; // processes we started (to clean up on Ctrl-C)

function isPortOpen(port) {
  return new Promise((resolve) => {
    const s = net.connect({ host: '127.0.0.1', port }, () => {
      s.destroy();
      resolve(true);
    });
    s.on('error', () => resolve(false));
    s.setTimeout(800, () => {
      s.destroy();
      resolve(false);
    });
  });
}

function isNgrokTunnelUp() {
  return new Promise((resolve) => {
    const req = http.get(NGROK_API, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const { tunnels = [] } = JSON.parse(data || '{}');
          resolve(tunnels.some((t) => t.name === NGROK_TUNNEL_NAME));
        } catch {
          resolve(false);
        }
      });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(800, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function startAttached([cmd, args], name) {
  const child = spawn(cmd, args, { stdio: 'inherit', env: process.env });
  started.push({ name, pid: child.pid, child });
  console.log(`[${name}] started (pid ${child.pid})`);

  child.on('exit', (code, sig) => {
    console.log(`[${name}] exited (${sig || code})`);
    // If either foreground child exits, we exit too (dev-style behavior)
    process.exit(code ?? 0);
  });
  return child;
}

async function waitFor(condFn, tries = 40, delayMs = 250) {
  for (let i = 0; i < tries; i++) {
    if (await condFn()) return true;
    await wait(delayMs);
  }
  return false;
}

function shutdown() {
  if (!started.length) process.exit(0);
  console.log('\nShutting down…');
  for (const { name, child } of started) {
    if (!child.killed) {
      try {
        process.kill(child.pid, 'SIGTERM');
      } catch {}
      console.log(`[${name}] SIGTERM sent`);
    }
  }
  setTimeout(() => process.exit(0), 800);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

(async function main() {
  // 1) Proxy
  const proxyUp = await isPortOpen(PROXY_PORT);
  if (proxyUp) {
    console.log(`Proxy already live on :${PROXY_PORT}`);
  } else {
    startAttached(PROXY_CMD, 'proxy');
    const ok = await waitFor(() => isPortOpen(PROXY_PORT));
    if (!ok) {
      console.error('Proxy failed to come up.');
      process.exit(1);
    }
  }

  // 2) ngrok
  const ngrokUp = await isNgrokTunnelUp();
  if (ngrokUp) {
    console.log('ngrok tunnel already live.');
  } else {
    startAttached(NGROK_CMD, 'ngrok');
    const ok = await waitFor(() => isNgrokTunnelUp());
    if (!ok) {
      console.error('ngrok tunnel did not come up.');
      process.exit(1);
    }
  }

  // If we didn’t start anything, just exit; otherwise stay attached to children.
  if (!started.length) {
    console.log('Everything already live. Nothing to do.');
    process.exit(0);
  }
})();
