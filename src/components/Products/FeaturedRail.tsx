import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';

interface FeaturedRailProps {
  products: Product[];
}

/** Vitrine horizontal com scroll-snap: 4 itens no desktop, 1 por vez no mobile. Sem autoplay. */
export default function FeaturedRail({ products }: FeaturedRailProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    track.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      track.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges, products]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * (card.clientWidth + gap), behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className="featured">
      <div className="products__subhead">
        <h3 className="products__subtitle">
          Destaques
        </h3>
        <div className="featured__controls">
          <button type="button" className="icon-btn" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Destaque anterior">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" className="icon-btn" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Próximo destaque">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul className="featured__track" ref={trackRef} tabIndex={0} aria-label="Produtos em destaque">
        {products.map((product) => (
          <li key={product.id} className="featured__item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
