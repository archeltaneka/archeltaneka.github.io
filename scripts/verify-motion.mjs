// Keep Vite and its browser checks in one process lifetime, including remote sandboxes.
import { createServer } from 'vite';
import { spawn } from 'node:child_process';
const server = await createServer({ server: { host: '127.0.0.1', port: 5173, strictPort: true } });
await server.listen();
try {
  const checks = process.argv.slice(2);
  for (const check of checks.length ? checks : ['check-water-transition', 'check-scene-continuity', 'check-scene-motion', 'check-experience', 'check-landing', 'check-menu-motion', 'check-page-load-dive']) {
    const code = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [`scripts/${check}.mjs`], { stdio: 'inherit', env: process.env });
      child.on('error', reject);
      child.on('exit', resolve);
    });
    if (code !== 0) { process.exitCode = code || 1; break; }
  }
} finally { await server.close(); }
