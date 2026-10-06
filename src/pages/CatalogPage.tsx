import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useParams, useSearchParams } from 'react-router';
import { Search, X } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import {
  getCategories,
  isProductSort,
  productSortOptions,
  searchProducts,
  sortProducts,
  type ProductSort,
} from '../lib/products';
import { routes } from '../lib/routes';
import { createWhatsAppLink } from '../lib/whatsapp';
import { useSeo } from '../hooks/useSeo';
import { catalogSeo, loadingSeo, notFoundSeo } from '../lib/pageSeo';
import { useProducts } from '../hooks/useProducts';
import PageHeader from '../components/PageHeader/PageHeader';
import type { ScrollState } from '../components/ScrollManager';
import ProductCard from '../components/ProductCard/ProductCard';
import { ProductsMessage, ProductsSkeleton } from '../components/Products/ProductsStatus';
import ButtonLink from '../components/ui/ButtonLink';
import NotFoundPage, { notFoundTexts } from './NotFoundPage';
import './CatalogPage.css';

const keepScroll: ScrollState = { preserveScroll: true };

const LEAD = 'Tecnologia, acessórios e eletrônicos para o seu dia a dia. Escolha o produto e fale com a gente pelo WhatsApp.';

export default function CatalogPage() {
  const { categoria } = useParams();
  const [params, setParams] = useSearchParams();
  const { state, retry } = useProducts();
  const gridRef = useRef<HTMLUListElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const urlQuery = params.get('busca') ?? '';
  // A busca filtra na hora; a URL é atualizada com um pequeno atraso.
  const [query, setQuery] = useState(urlQuery);
  const sortParam = params.get('ordem');
  const sort: ProductSort = isProductSort(sortParam) ? sortParam : 'relevancia';

  const products = state.status === 'success' ? state.products : null;
  const categories = useMemo(() => (products ? getCategories(products) : []), [products]);
  const category = categoria ? categories.find((c) => c.slug === categoria) : undefined;

  const visible = useMemo(() => {
    if (!products) return [];
    const inCategory = categoria ? products.filter((p) => p.categorySlug === categoria) : products;
    return sortProducts(searchProducts(inCategory, query), sort);
  }, [products, categoria, query, sort]);

  const missingCategory = Boolean(products && categoria && !category);
  const title = category?.name ?? 'Produtos';
  useSeo(
    missingCategory
      ? notFoundSeo(notFoundTexts.category.title, notFoundTexts.category.message)
      : products
        ? catalogSeo(category, products)
        : loadingSeo(categoria ? routes.category(categoria) : routes.catalog, title),
  );

  const updateParam = (key: string, value: string, fallback = '') => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value && value !== fallback) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  useEffect(() => {
    if (query === urlQuery) return;
    const timer = setTimeout(() => updateParam('busca', query.trim() ? query : ''), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Ao trocar de categoria (links sem ?busca), a busca acompanha a URL.
  useEffect(() => setQuery(urlQuery), [categoria]);

  // Troca de categoria pelo menu: mantém a posição; se a lista já passou do topo,
  // alinha a ela antes da pintura (sem salto visível).
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !(location.state as ScrollState | null)?.preserveScroll) return;
    if (list.getBoundingClientRect().top < 0) list.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [categoria]);

  // Entrada da grade a cada troca de categoria, busca ou ordenação.
  useGSAP(
    () => {
      const items = gridRef.current?.children;
      if (!items?.length) return;
      requestAnimationFrame(() => ScrollTrigger.refresh());
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' },
      );
    },
    { dependencies: [categoria, query, sort, state.status], scope: gridRef },
  );

  if (missingCategory) {
    return <NotFoundPage {...notFoundTexts.category} />;
  }

  const breadcrumbs = [
    { label: 'Início', to: routes.home },
    { label: 'Produtos', to: routes.catalog },
    ...(category ? [{ label: category.name }] : []),
  ];

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} label="Catálogo" title={title} lead={LEAD} />

      <section className="catalog-page container" aria-label="Lista de produtos" ref={listRef}>
        <aside className="catalog-page__aside">
          <nav className="catalog-nav" aria-label="Categorias">
            <h2 className="catalog-nav__title mono">Categorias</h2>
            <ul>
              <li>
                <NavLink to={routes.catalog} end state={keepScroll} className="catalog-nav__link">
                  Todos
                  <span className="mono">{String(products?.length ?? 0).padStart(2, '0')}</span>
                </NavLink>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <NavLink to={routes.category(c.slug)} state={keepScroll} className="catalog-nav__link">
                    {c.name}
                    <span className="mono">{String(c.count).padStart(2, '0')}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="catalog-help">
            <p className="catalog-help__title">Não encontrou o que procura?</p>
            <p className="catalog-help__text">Fale com a gente e consulte outros modelos e disponibilidade.</p>
            <ButtonLink href={createWhatsAppLink('Olá! Estou procurando um produto e gostaria de consultar a disponibilidade.')} icon="whatsapp" size="sm" variant="secondary" block>
              Consultar no WhatsApp
            </ButtonLink>
          </div>
        </aside>

        <div className="catalog-page__main">
          <h2 className="sr-only">{category ? `Produtos da categoria ${category.name}` : 'Todos os produtos'}</h2>
          <div className="catalog-toolbar">
            <label className="catalog-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Buscar produtos</span>
              <input
                type="search"
                placeholder="Buscar produtos"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button type="button" className="catalog-search__clear" onClick={() => setQuery('')} aria-label="Limpar busca">
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </label>
            <label className="catalog-sort">
              <span className="mono">Ordenar</span>
              <select value={sort} onChange={(event) => updateParam('ordem', event.target.value, 'relevancia')}>
                {productSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {state.status === 'loading' && <ProductsSkeleton />}
          {state.status === 'error' && <ProductsMessage kind="error" onRetry={retry} />}
          {products && products.length === 0 && <ProductsMessage kind="empty" />}

          {products && products.length > 0 && (
            <>
              <p className="catalog-count mono" aria-live="polite">
                {visible.length} {visible.length === 1 ? 'produto' : 'produtos'}
                {query && ` para “${query}”`}
              </p>

              {visible.length > 0 ? (
                <ul className="catalog-grid" ref={gridRef}>
                  {visible.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} headingLevel="h3" />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="catalog-empty">
                  <p className="catalog-empty__title">Nenhum produto encontrado.</p>
                  <p>Tente outro termo ou fale com a gente pelo WhatsApp.</p>
                  <button type="button" className="btn btn--secondary btn--sm" onClick={() => setQuery('')}>
                    <X size={16} className="btn__icon" aria-hidden="true" />
                    <span>Limpar busca</span>
                  </button>
                </div>
              )}

              <p className="catalog-note mono">Imagens ilustrativas. Disponibilidade e valores sujeitos a confirmação pelo WhatsApp.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
