import { useState } from 'react';
import './ProductGallery.css';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const FALLBACK_IMAGE = '/images/logo.jpeg';

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const srcOf = (src: string) => (failed[src] ? FALLBACK_IMAGE : src);
  const current = images[index] ?? images[0];

  return (
    <div className="gallery">
      <figure className="gallery__main tech-frame">
        <img
          key={current}
          src={srcOf(current)}
          alt={images.length > 1 ? `${name} — imagem ${index + 1} de ${images.length}` : name}
          width={720}
          height={900}
          decoding="async"
          onError={() => setFailed((state) => ({ ...state, [current]: true }))}
        />
      </figure>
      {images.length > 1 && (
        <ul className="gallery__thumbs" aria-label="Imagens do produto">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                className="gallery__thumb"
                aria-label={`Ver imagem ${i + 1}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <img src={srcOf(src)} alt="" width={120} height={150} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
