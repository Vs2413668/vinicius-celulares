import { useState } from 'react';
import { Store } from 'lucide-react';

interface StorePhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholderLabel?: string;
}

/**
 * Foto real da loja com tratamento escuro. Enquanto o arquivo não existir
 * (ou falhar), exibe um placeholder elegante — sem fotos genéricas.
 */
export default function StorePhoto({ src, alt, width, height, className = '', placeholderLabel = 'Foto da loja' }: StorePhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`store-photo tech-frame ${className}`}>
      <div className="store-photo__media">
        {failed ? (
          <div className="store-photo__placeholder" role="img" aria-label={placeholderLabel}>
            <Store size={28} aria-hidden="true" />
            <span className="mono">{placeholderLabel}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            data-anim="photo"
          />
        )}
      </div>
    </figure>
  );
}
