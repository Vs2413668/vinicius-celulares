/**
 * Pré-renderização (SSG) executada no fim do `npm run build`.
 *
 * Para cada rota pública gera `dist/<rota>/index.html` com o conteúdo já
 * renderizado e o <head> próprio da página (title, description, canonical,
 * Open Graph, JSON-LD). Também gera:
 *   - dist/404.html   página de erro (noindex), servida com status 404;
 *   - dist/app.html   "casca" da SPA para produtos cadastrados após o build;
 *   - dist/sitemap.xml e dist/robots.txt (a partir de VITE_SITE_URL).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');

const server = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('[prerender] index.html sem os marcadores <!--seo--> ou <div id="root"></div>.');
}

const { products, pages } = await server.loadSite();
const snapshot = products
  ? `<script type="application/json" id="products-data">${server.escapeScriptJson(JSON.stringify(products))}</script>`
  : '';

function buildHtml({ head, html = '', prerendered = '', data = '' }) {
  const rootAttr = prerendered ? ` data-prerendered="${prerendered}"` : '';
  return template
    .replace(SEO_BLOCK, head)
    .replace('<div id="root"></div>', `<div id="root"${rootAttr}>${html}</div>${data}`);
}

async function write(file, content) {
  const target = join(dist, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

const fileFor = (path) => (path === '/' ? 'index.html' : join(path.slice(1), 'index.html'));

for (const page of pages) {
  const { html, head } = server.render(page.path);
  await write(fileFor(page.path), buildHtml({ head, html, prerendered: page.path, data: snapshot }));
}

// Página 404 real (o servidor a entrega com status 404 para URLs inexistentes).
const notFound = server.render('/404');
await write('404.html', buildHtml({ head: notFound.head, html: notFound.html, prerendered: '*' }));

// Casca da SPA: produtos novos da planilha funcionam antes do próximo build.
await write('app.html', buildHtml({ head: server.renderHeadTags({ ...server.homeSeo(), path: undefined, jsonLd: [] }), data: snapshot }));

// Sitemap e robots dependem do domínio oficial.
const { siteUrl } = server;
const xml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

if (siteUrl) {
  const urls = pages.map(({ path, images }) => {
    const imageTags = images
      .map((image) => `\n    <image:image><image:loc>${xml(server.absoluteUrl(image))}</image:loc></image:image>`)
      .join('');
    return `  <url>\n    <loc>${xml(server.absoluteUrl(path))}</loc>${imageTags}\n  </url>`;
  });
  await write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`,
  );
} else {
  console.warn('[prerender] VITE_SITE_URL não definido: sitemap.xml não gerado e canonical omitida. Configure o domínio no .env.');
}

await write(
  'robots.txt',
  ['User-agent: *', 'Allow: /', 'Disallow: /app.html', ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : []), ''].join('\n'),
);

await rm(serverDir, { recursive: true, force: true });
console.log(`[prerender] ${pages.length} páginas geradas${siteUrl ? ` · sitemap com ${pages.length} URLs` : ''}.`);
