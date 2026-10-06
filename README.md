# Vinícius Celulares — Site institucional

Site institucional da assistência técnica **Vinícius Celulares** (Jardim Ingá).
React + TypeScript + Vite, animações com GSAP/ScrollTrigger e ícones Lucide.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build + pré-renderização (SEO) em dist/
npm run preview    # serve o build localmente
```

## Produtos (Google Sheets e Drive)

| Recurso | Link |
| ------- | ---- |
| Planilha de produtos (edição) | [https://docs.google.com/spreadsheets/d/1Nbdiw9G8l6Zr-WNv2FxjALliIgeeXwj3IQ31GDtzFrE/edit](https://docs.google.com/spreadsheets/d/1Nbdiw9G8l6Zr-WNv2FxjALliIgeeXwj3IQ31GDtzFrE/edit) |
| CSV lido pelo site (`VITE_PRODUCTS_CSV_URL`) | `https://docs.google.com/spreadsheets/d/1Nbdiw9G8l6Zr-WNv2FxjALliIgeeXwj3IQ31GDtzFrE/export?format=csv` |
| Pasta de imagens dos produtos | [https://drive.google.com/drive/folders/11aUz5eBTMwuwsWMg1uTQuRcCmg3Qvr7z](https://drive.google.com/drive/folders/11aUz5eBTMwuwsWMg1uTQuRcCmg3Qvr7z) |

Ambos ficam no Google Drive pessoal do Iggor (igor.moreiramodesto@gmail.com) e precisam continuar
compartilhados como **"Qualquer pessoa com o link: Leitor"**: o site lê a planilha e as fotos sem login.

- Para cadastrar ou alterar produtos, edite a planilha. O site mostra a mudança ao recarregar a página.
- Para usar uma foto nova, suba na pasta, copie o link (Compartilhar → Copiar link) e cole na coluna `imagem`.
- Passo a passo e descrição das colunas: [GOOGLE_SHEETS.md](GOOGLE_SHEETS.md).

## Rotas

| Rota                                | Página                                              |
| ----------------------------------- | --------------------------------------------------- |
| `/`                                 | Home (seções institucionais + vitrine de destaques) |
| `/produtos`                         | Catálogo completo com busca e ordenação             |
| `/produtos/categoria/:categoria`    | Catálogo filtrado por categoria                     |
| `/produtos/:slug`                   | Página do produto (galeria, preço, especificações)  |

A compra não acontece no site: o botão **Tenho interesse** abre o WhatsApp com o nome do produto.

O build gera um HTML estático para cada rota (veja [SEO](#seo)). A hospedagem serve esses arquivos
diretamente, entrega `404.html` com status 404 para URLs inexistentes e usa `app.html` (casca da SPA)
apenas para `/produtos/*` ainda não pré-renderizados (produtos cadastrados depois do último deploy).
Já estão configurados: `vercel.json` (Vercel), `public/_redirects` (Netlify) e `public/.htaccess` (Apache/Hostinger).

## Configuração

| O quê                              | Onde                                   |
| ---------------------------------- | -------------------------------------- |
| Nome, WhatsApp, endereço, horários | `src/lib/config.ts` (`company`)        |
| Localização do mapa (coordenadas)  | `src/lib/config.ts` (`mapConfig`)      |
| Mensagens do WhatsApp              | `src/lib/config.ts` (`messages`)       |
| Links do WhatsApp                  | `src/lib/whatsapp.ts` (`createWhatsAppLink`) |
| Serviços / diferenciais            | `src/data/services.ts`, `src/data/differentials.ts` |
| Produtos                           | `src/lib/products.ts` (`getProducts`) — veja [GOOGLE_SHEETS.md](GOOGLE_SHEETS.md) |

Variáveis de ambiente (`.env.local`, veja `.env.example`):

- `VITE_SITE_URL` — domínio oficial (gera `canonical`, `og:url`, `og:image`, `sitemap.xml`, `robots.txt` e JSON-LD).
- `VITE_GOOGLE_SITE_VERIFICATION` — código da verificação do Google Search Console (opcional).
- `VITE_PRODUCTS_CSV_URL` — CSV publicado da planilha de produtos. Vazio = produtos demonstrativos.

> O mapa e os botões de rota (Google Maps e Waze) usam as coordenadas do pin em
> `mapConfig.lat` / `mapConfig.lng`.

## Imagens

- `public/images/logo.jpeg` — logo oficial (Open Graph, dados estruturados); `logo.webp` é a versão otimizada do hero.
- `public/images/logo-mark.webp` / `logo-wordmark.webp` — recortes da logo oficial com fundo transparente (navbar/rodapé).
- `public/images/loja.jpg` — foto da fachada (seção Quem Somos). Basta substituir o arquivo para trocar a foto; se ele não existir, um placeholder é exibido.
- `public/images/produtos/` — fotos usadas nos produtos demonstrativos.
- `imagens/` — arquivos originais enviados pelo cliente (não são servidos pelo site).

## SEO

- **Pré-renderização (SSG):** `npm run build` executa `vite build`, um build SSR de `src/entry-server.tsx`
  e `scripts/prerender.mjs`, que grava `dist/<rota>/index.html` com o conteúdo completo e o `<head>` da página.
  No navegador o React hidrata esse HTML (`src/main.tsx`); animações e interações continuam iguais.
- **Produtos:** a planilha é lida no build. Cada produto ativo ganha uma página estática e entra no sitemap.
  O HTML traz um snapshot dos produtos, e o navegador relê a planilha ao abrir a página (mudanças de preço
  e texto aparecem na hora). **Produtos novos entram no sitemap e no HTML estático no próximo deploy.**
- **Metadados por rota:** `src/lib/pageSeo.ts` (title, description, canonical, Open Graph, JSON-LD) aplicados
  com `useSeo()`. Tags geradas em `src/lib/seo.ts`; dados estruturados em `src/lib/structuredData.ts`
  (`LocalBusiness`, `WebSite`, `Product`, `BreadcrumbList`, `ItemList`).
- **Gerados no build:** `sitemap.xml` (com imagens), `robots.txt`, `404.html` (noindex) e `app.html`.
  Sem `VITE_SITE_URL`, o sitemap não é gerado e a canonical é omitida.
- **SEO local:** endereço, coordenadas, telefone e horários vêm de `src/lib/config.ts`. Cidade, UF e CEP
  (`company.city`, `company.state`, `company.postalCode`) só devem ser preenchidos com dados confirmados.

## Estrutura

```
src/
  pages/        HomePage, CatalogPage, ProductPage, NotFoundPage
  components/   Layout, Navbar, Intro, Hero, About, Services, Products, ProductCard,
                ProductGallery, PageHeader, Breadcrumbs, WhyUs, Contact, Footer,
                WhatsAppButton, CircuitBackground, SectionDivider, CursorGlow, ui/
  data/         products.ts (tipos + mock), services.ts, differentials.ts
  hooks/        useGsap, useParallax, useProducts, useScrolled, useActiveSection, useSeo
  lib/          config, routes, whatsapp, products, gsap, animations, seo, pageSeo, structuredData
  entry-server.tsx  entrada da pré-renderização (somente build)
scripts/
  prerender.mjs gera o HTML de cada rota, 404, sitemap e robots
  styles/       global.css (tokens de design)
```

### Animações

Todas as animações passam por `useGsap()` (`src/hooks/useGsap.ts`), que usa `useGSAP`
(gsap.context com cleanup automático) + `gsap.matchMedia` para tratar
`prefers-reduced-motion` e mobile. Parallax é declarativo: qualquer elemento com
`data-parallax="<px>"` recebe o efeito (desativado com reduced motion, reduzido no mobile).
