import { useMemo, useRef } from 'react';
import { reveal } from '../../lib/animations';
import { ScrollTrigger } from '../../lib/gsap';
import { getCategories } from '../../lib/products';
import { routes } from '../../lib/routes';
import { useGsap } from '../../hooks/useGsap';
import { useProducts } from '../../hooks/useProducts';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import ButtonLink from '../ui/ButtonLink';
import SectionHeader from '../ui/SectionHeader';
import CategoryShortcuts from './CategoryShortcuts';
import FeaturedRail from './FeaturedRail';
import { ProductsMessage, ProductsSkeleton } from './ProductsStatus';
import './Products.css';

/** Vitrine da home: destaques + atalhos de categoria. O catálogo completo fica em /produtos. */
export default function Products() {
  const ref = useRef<HTMLElement>(null);
  const { state, retry } = useProducts();
  const products = state.status === 'success' ? state.products : null;
  const featured = useMemo(() => products?.filter((p) => p.featured) ?? [], [products]);
  const categories = useMemo(() => (products ? getCategories(products) : []), [products]);

  useGsap(
    ref,
    ({ reduced, mobile }) => {
      if (state.status !== 'success') return;
      requestAnimationFrame(() => ScrollTrigger.refresh());
      if (reduced) return;
      const section = ref.current!;
      reveal(section.querySelectorAll('.section-header > *'), { trigger: section, stagger: 0.1 });
      reveal(section.querySelectorAll('.products__subhead'), { trigger: section, start: 'top 70%', y: 20 });
      reveal(section.querySelectorAll('.featured__item'), { trigger: '.featured', x: mobile ? 40 : 80, y: 0, stagger: 0.1 });
      reveal(section.querySelectorAll('.category-shortcuts > li'), { trigger: '.category-shortcuts', y: 30, stagger: 0.1 });
    },
    [state.status],
  );

  return (
    <section id="produtos" className="section products" ref={ref} aria-labelledby="products-title">
      <CircuitBackground variant="side" parallax={50} className="products__circuit" />
      <div className="container">
        <div className="products__head">
          <SectionHeader
            index="03"
            label="Vitrine"
            title="Produtos"
            id="products-title"
            lead="Tecnologia, acessórios e eletrônicos para o seu dia a dia."
          />
          <ButtonLink href={routes.catalog} variant="secondary" className="products__all">
            Ver todos os produtos
          </ButtonLink>
        </div>

        {state.status === 'loading' && <ProductsSkeleton />}
        {state.status === 'error' && <ProductsMessage kind="error" onRetry={retry} />}
        {products && products.length === 0 && <ProductsMessage kind="empty" />}
        {products && products.length > 0 && (
          <div className="products__content">
            {featured.length > 0 && <FeaturedRail products={featured} />}
            <div>
              <div className="products__subhead">
                <h3 className="products__subtitle">Categorias</h3>
              </div>
              <CategoryShortcuts categories={categories} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
