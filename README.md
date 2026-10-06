# Vinícius Celulares — Site institucional

Site institucional da assistência técnica **Vinícius Celulares** (Jardim Ingá).
React + TypeScript + Vite, animações com GSAP/ScrollTrigger e ícones Lucide.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build localmente
```

## Rotas

| Rota                                | Página                                              |
| ----------------------------------- | --------------------------------------------------- |
| `/`                                 | Home (seções institucionais + vitrine de destaques) |
| `/produtos`                         | Catálogo completo com busca e ordenação             |
| `/produtos/categoria/:categoria`    | Catálogo filtrado por categoria                     |
| `/produtos/:slug`                   | Página do produto (galeria, preço, especificações)  |

A compra não acontece no site: o botão **Tenho interesse** abre o WhatsApp com o nome do produto.

Por ser uma SPA, a hospedagem precisa redirecionar todas as rotas para `index.html`.
Já estão incluídos: `vercel.json` (Vercel), `public/_redirects` (Netlify) e `public/.htaccess` (Apache/Hostinger).

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

- `VITE_SITE_URL` — domínio final (gera `canonical`, `og:url` e `og:image` absolutos).
- `VITE_PRODUCTS_CSV_URL` — CSV publicado da planilha de produtos. Vazio = produtos demonstrativos.

> O mapa e os botões de rota (Google Maps e Waze) usam as coordenadas do pin em
> `mapConfig.lat` / `mapConfig.lng`.

## Imagens

- `public/images/logo.jpeg` — logo oficial (hero, Open Graph).
- `public/images/logo-mark.webp` / `logo-wordmark.webp` — recortes da logo oficial com fundo transparente (navbar/rodapé).
- `public/images/loja.jpg` — foto da fachada (seção Quem Somos). Basta substituir o arquivo para trocar a foto; se ele não existir, um placeholder é exibido.
- `public/images/produtos/` — fotos usadas nos produtos demonstrativos.
- `imagens/` — arquivos originais enviados pelo cliente (não são servidos pelo site).

## Estrutura

```
src/
  pages/        HomePage, CatalogPage, ProductPage, NotFoundPage
  components/   Layout, Navbar, Intro, Hero, About, Services, Products, ProductCard,
                ProductGallery, PageHeader, Breadcrumbs, WhyUs, Contact, Footer,
                WhatsAppButton, CircuitBackground, SectionDivider, CursorGlow, ui/
  data/         products.ts (tipos + mock), services.ts, differentials.ts
  hooks/        useGsap, useParallax, useProducts, useScrolled, useActiveSection, useDocumentMeta
  lib/          config, routes, whatsapp, products, gsap, animations
  styles/       global.css (tokens de design)
```

### Animações

Todas as animações passam por `useGsap()` (`src/hooks/useGsap.ts`), que usa `useGSAP`
(gsap.context com cleanup automático) + `gsap.matchMedia` para tratar
`prefers-reduced-motion` e mobile. Parallax é declarativo: qualquer elemento com
`data-parallax="<px>"` recebe o efeito (desativado com reduced motion, reduzido no mobile).
