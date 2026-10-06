import { StrictMode, useLayoutEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './styles/global.css';
import App from './App';
import type { Product } from './data/products';
import { seedProducts } from './lib/products';

/** Libera a exibição do HTML pré-renderizado após os estados iniciais das animações. */
function Root() {
  useLayoutEffect(() => document.documentElement.classList.remove('js-hydrating'), []);
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

const container = document.getElementById('root')!;
const snapshot = document.getElementById('products-data');
if (snapshot?.textContent) seedProducts(JSON.parse(snapshot.textContent) as Product[]);

// O build gera HTML estático por rota (scripts/prerender.mjs). Quando o HTML
// corresponde à URL atual, o React "hidrata" o conteúdo existente.
const { pathname, search } = window.location;
const prerendered = container.dataset.prerendered;
const matchesUrl = prerendered === '*' || (prerendered === pathname && !(search && pathname.startsWith('/produtos')));

if (container.hasChildNodes() && matchesUrl) {
  hydrateRoot(container, <Root />);
} else {
  container.replaceChildren();
  createRoot(container).render(<Root />);
}
