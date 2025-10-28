import { useEffect } from "react";

import { useLocalization } from "../contexts/LocalizationContext";
import type { Product } from "../types";

interface ProductDetailsMessages {
  title: string;
  category: string;
  tags: string;
  close: string;
  addToCart: string;
}

interface ProductDetailsDrawerProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  messages: ProductDetailsMessages;
}

function ProductDetailsDrawer({ product, onClose, onAddToCart, messages }: ProductDetailsDrawerProps): JSX.Element | null {
  const { formatCurrency } = useLocalization();

  useEffect(() => {
    if (!product) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, product]);

  if (!product) {
    return null;
  }

  const price = formatCurrency(product.price ?? 0);
  const fallbackImage =
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80";
  const image = product.image ?? fallbackImage;

  return (
    <div className="product-details" role="dialog" aria-modal="true" aria-labelledby="product-details-title">
      <div className="product-details__overlay" onClick={onClose} />
      <div className="product-details__panel">
        <button type="button" className="product-details__close" onClick={onClose} aria-label={messages.close}>
          ×
        </button>
        <div className="product-details__media">
          <img src={image} alt={product.name} loading="lazy" />
        </div>
        <div className="product-details__content">
          <p className="product-details__eyebrow">{messages.title}</p>
          <h3 id="product-details-title">{product.name}</h3>
          <p className="product-details__price">{price}</p>
          <p className="product-details__description">{product.description}</p>
          <dl className="product-details__meta">
            <div>
              <dt>{messages.category}</dt>
              <dd>{product.category}</dd>
            </div>
            {product.tags.length ? (
              <div>
                <dt>{messages.tags}</dt>
                <dd>
                  <ul>
                    {product.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
          <button
            type="button"
            className="product-details__cta"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            {messages.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsDrawer;
