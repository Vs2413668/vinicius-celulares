import { useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Info, MapPin, MessageCircle } from 'lucide-react';
import { company, messages } from '../lib/config';
import { formatPrice, getDisplayedCondition, getRelatedProducts } from '../lib/products';
import { routes } from '../lib/routes';
import { createWhatsAppLink } from '../lib/whatsapp';
import { reveal } from '../lib/animations';
import { gsap } from '../lib/gsap';
import { useSeo } from '../hooks/useSeo';
import { loadingSeo, notFoundSeo, productBreadcrumbs, productSeo } from '../lib/pageSeo';
import { useGsap } from '../hooks/useGsap';
import { useProducts } from '../hooks/useProducts';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import CircuitBackground from '../components/CircuitBackground/CircuitBackground';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import { ProductsMessage } from '../components/Products/ProductsStatus';
import ButtonLink from '../components/ui/ButtonLink';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import NotFoundPage, { notFoundTexts } from './NotFoundPage';
import './ProductPage.css';

export default function ProductPage() {
  const { slug } = useParams();
  const { state, retry } = useProducts();
  const ref = useRef<HTMLDivElement>(null);

  const products = state.status === 'success' ? state.products : null;
  const product = products?.find((p) => p.slug === slug);
  const related = useMemo(() => (products && product ? getRelatedProducts(products, product) : []), [products, product]);

  useSeo(
    product
      ? productSeo(product)
      : products
        ? notFoundSeo(notFoundTexts.product.title, notFoundTexts.product.message)
        : loadingSeo(routes.product(slug ?? ''), 'Produto'),
  );

  useGsap(
    ref,
    ({ reduced, mobile }) => {
      if (!product || reduced) return;
      const root = ref.current!;
      gsap.from('.gallery', { autoAlpha: 0, x: mobile ? 0 : -40, y: mobile ? 24 : 0, duration: 1 });
      gsap.from(root.querySelectorAll('.product__info > *'), { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.06, delay: 0.15 });
      reveal(root.querySelectorAll('.product-details > *'), { trigger: '.product-details', stagger: 0.12 });
      reveal(root.querySelectorAll('.product-related li'), { trigger: '.product-related', stagger: 0.08 });
    },
    [product?.id],
  );

  if (state.status === 'loading') {
    return (
      <div className="product-page container">
        <div className="product product--loading" role="status" aria-label="Carregando produto">
          <div className="skeleton skeleton--media" />
          <div className="product__info">
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--short" />
          </div>
        </div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="product-page container">
        <ProductsMessage kind="error" onRetry={retry} />
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage {...notFoundTexts.product} />;
  }

  const condition = getDisplayedCondition(product);
  const interestLink = createWhatsAppLink(messages.product(product.name));
  const hasPrice = product.price !== null;
  const price = hasPrice ? formatPrice(product.price) : 'Consulte o valor';

  return (
    <div className="product-page" ref={ref}>
      <CircuitBackground variant="side" mirror parallax={40} className="product-page__circuit" />

      <div className="container">
        <div className="product-page__top">
          <Breadcrumbs items={productBreadcrumbs(product)} />
          <Link to={routes.category(product.categorySlug)} className="product-page__back">
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar para {product.category}
          </Link>
        </div>

        <article className="product">
          <ProductGallery images={product.images} name={product.name} />

          <div className="product__info">
            <Link to={routes.category(product.categorySlug)} className="label product__category">
              {product.category}
            </Link>
            <h1 className="product__name">{product.name}</h1>

            {(product.brand || condition) && (
              <ul className="product__badges" aria-label="Características">
                {product.brand && (
                  <li>
                    <span className="mono">Marca</span> {product.brand}
                  </li>
                )}
                {condition && (
                  <li>
                    <span className="mono">Condição</span> {condition}
                  </li>
                )}
              </ul>
            )}

            <div className="product__price-box">
              <p className="product__price-label mono">{hasPrice ? 'Valor' : 'Valor sob consulta'}</p>
              <p className={`product__price ${hasPrice ? '' : 'product__price--ask'}`}>{price}</p>
            </div>

            {product.description && <p className="product__summary">{product.description}</p>}

            <div className="product__actions">
              <ButtonLink href={interestLink} icon="whatsapp" block>
                Tenho interesse
              </ButtonLink>
            </div>

            <ul className="product__notes">
              <li>
                <MessageCircle size={18} aria-hidden="true" />
                <span>Negociação e compra pelo WhatsApp {company.whatsappDisplay}.</span>
              </li>
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>
                  Loja física no {company.neighborhood}: {company.address}.
                </span>
              </li>
              <li>
                <Info size={18} aria-hidden="true" />
                <span>Disponibilidade e valores sujeitos a confirmação.</span>
              </li>
            </ul>
          </div>
        </article>

        <section className="product-details" aria-labelledby="product-details-title">
          <div className="product-details__text">
            <h2 className="product-details__title" id="product-details-title">
              Detalhes
            </h2>
            <p>{product.details}</p>
          </div>
          {product.specs.length > 0 && (
            <div className="product-details__specs">
              <h2 className="product-details__title">Especificações</h2>
              <dl>
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="mono">{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>

        {related.length > 0 && (
          <section className="product-related" aria-labelledby="related-title">
            <div className="products__subhead">
              <h2 className="products__subtitle" id="related-title">
                Você também pode gostar
              </h2>
              <Link to={routes.catalog} className="product-related__all">
                Ver todos os produtos
              </Link>
            </div>
            <ul className="product-related__grid">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="product-bar">
        <div>
          <p className="product-bar__name">{product.name}</p>
          <p className={`product-bar__price ${hasPrice ? '' : 'product-bar__price--ask'}`}>{price}</p>
        </div>
        <a href={interestLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
          <WhatsAppIcon size={16} className="btn__icon whatsapp-glyph" />
          <span>Tenho interesse</span>
        </a>
      </div>
    </div>
  );
}
