import { memo, useState } from 'react';
import { Link } from 'react-router';
import type { Product } from '../../data/products';
import { messages } from '../../lib/config';
import { formatPrice, getDisplayedCondition } from '../../lib/products';
import { routes } from '../../lib/routes';
import { createWhatsAppLink } from '../../lib/whatsapp';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  /** Nível do título (h3 em listas de página, h4 dentro de seções). */
  headingLevel?: 'h3' | 'h4';
}

const FALLBACK_IMAGE = '/images/logo.jpeg';

function ProductCard({ product, headingLevel: Heading = 'h4' }: ProductCardProps) {
  const [image, setImage] = useState(product.image);
  const hasPrice = product.price !== null;
  const href = routes.product(product.slug);
  const condition = getDisplayedCondition(product);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={image}
          alt={product.name}
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
          onError={() => image !== FALLBACK_IMAGE && setImage(FALLBACK_IMAGE)}
        />
        <span className="product-card__category mono">{product.category}</span>
        {condition && <span className="product-card__condition mono">{condition.split(' — ')[0]}</span>}
      </div>
      <div className="product-card__body">
        <Heading className="product-card__name">
          {/* O ::after do link cobre o card inteiro (imagem + texto). */}
          <Link to={href} className="product-card__link">
            {product.name}
          </Link>
        </Heading>
        {product.description && <p className="product-card__desc">{product.description}</p>}
        <div className="product-card__footer">
          <p className={`product-card__price ${hasPrice ? '' : 'product-card__price--ask'}`}>
            {hasPrice ? formatPrice(product.price) : 'Consulte o valor'}
          </p>
          <a
            className="product-card__cta"
            href={createWhatsAppLink(messages.product(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Tenho interesse: ${product.name} (abre o WhatsApp)`}
          >
            <WhatsAppIcon size={16} className="whatsapp-glyph" />
            <span>Tenho interesse</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
