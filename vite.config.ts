import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Injeta canonical / og:url / og:image absolutos a partir de VITE_SITE_URL.
 * Sem a variável, as tags dependentes de domínio são omitidas e a og:image
 * usa caminho relativo.
 */
function siteMeta(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const tags = base
        ? `<link rel="canonical" href="${base}/" />\n    <meta property="og:url" content="${base}/" />`
        : '';
      return html.replace('<!-- site-meta -->', tags).split('__SITE_URL__').join(base);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), siteMeta(env.VITE_SITE_URL ?? '')],
    build: { target: 'es2020' },
  };
});
