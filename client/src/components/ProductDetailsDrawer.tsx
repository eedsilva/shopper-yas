import { useEffect, useRef } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useLocalization } from "../contexts/LocalizationContext";
import type { Product } from "../types";
import useDialogFocus from "../hooks/useDialogFocus";

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

function ProductDetailsDrawer({ product, onClose, onAddToCart, messages }: ProductDetailsDrawerProps): JSX.Element {
  const { formatCurrency } = useLocalization();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useDialogFocus(Boolean(product), closeButtonRef);

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

  const overlayTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.25,
    ease: shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1]
  } as const;

  const panelTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.32,
    ease: shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1]
  } as const;

  const price = product ? formatCurrency(product.price ?? 0) : "";
  const fallbackImage =
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80";
  const image = product?.image ?? fallbackImage;

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          key={product.id}
          className="product-details"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-details-title"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 }
          }}
        >
          <motion.div
            className="product-details__overlay"
            onClick={onClose}
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 }
            }}
            transition={overlayTransition}
          />
          <motion.div
            className="product-details__panel"
            variants={{
              hidden: shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 32, scale: 0.98 },
              visible: { opacity: 1, y: 0, scale: 1 },
              exit: shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }}
            transition={panelTransition}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="product-details__close"
              onClick={onClose}
              aria-label={messages.close}
            >
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ProductDetailsDrawer;
