import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

function readApiBaseUrl() {
  if (process.env.VITE_API_BASE_URL) {
    return process.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }

  try {
    const envFile = readFileSync(resolve('.env'), 'utf8');
    for (const line of envFile.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (key === 'VITE_API_BASE_URL') return rest.join('=').trim().replace(/\/$/, '');
    }
  } catch {
    // no .env
  }

  return '';
}

const apiBase = readApiBaseUrl();

if (!apiBase) {
  console.warn('[deploy-proxy] VITE_API_BASE_URL not set — upload proxy config skipped.');
  process.exit(0);
}

const apiHost = new URL(apiBase).host;

writeFileSync('public/_redirects', `/uploads/*  ${apiBase}/uploads/:splat  200\n`);

writeFileSync(
  'vercel.json',
  `${JSON.stringify(
    {
      rewrites: [{ source: '/uploads/:path*', destination: `${apiBase}/uploads/:path*` }],
    },
    null,
    2,
  )}\n`,
);

mkdirSync('deploy', { recursive: true });
writeFileSync(
  'deploy/nginx-uploads.conf',
  `# Paste inside the server { } block for your frontend site
location /uploads/ {
    proxy_pass ${apiBase}/uploads/;
    proxy_http_version 1.1;
    proxy_set_header Host ${apiHost};
    proxy_ssl_server_name on;
}
`,
);

console.log(`[deploy-proxy] /uploads → ${apiBase}/uploads/`);
