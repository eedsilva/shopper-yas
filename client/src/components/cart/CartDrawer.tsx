import { useEffect, useRef } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useCart } from "../../contexts/CartContext";
import { useLocalization, useMessages } from "../../contexts/LocalizationContext";
import useDialogFocus from "../../hooks/useDialogFocus";

function CartDrawer(): JSX.Element {
  const { cart } = useMessages();
  const { formatCurrency } = useLocalization();
  const {
    isOpen,
    items,
    subtotal,
    closeCart,
    removeFromCart,
    updateQuantity
  } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useDialogFocus(isOpen, closeButtonRef);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCart, isOpen]);

  const overlayTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.2,
    ease: shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1]
  } as const;

  const panelTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.28,
    ease: shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1]
  } as const;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="cart-drawer"
          className="cart-drawer"
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
            className="cart-drawer__overlay"
            onClick={closeCart}
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 }
            }}
            transition={overlayTransition}
          />
          <motion.aside
            className="cart-drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-label={cart.title}
            variants={{
              hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "8%" },
              visible: { opacity: 1, x: "0%" },
              exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "6%" }
            }}
            transition={panelTransition}
          >
            <header className="cart-drawer__header">
              <h2>{cart.title}</h2>
              <button ref={closeButtonRef} type="button" aria-label={cart.close} onClick={closeCart}>
                ×
              </button>
            </header>
            <div className="cart-drawer__body">
              {items.length === 0 ? (
                <p>{cart.empty}</p>
              ) : (
                <ul>
                  {items.map((item) => (
                    <li key={item.product.id} className="cart-drawer__item">
                      <div className="cart-drawer__thumb">
                        <img src={item.product.image} alt={item.product.name} loading="lazy" />
                      </div>
                      <div className="cart-drawer__details">
                        <h3>{item.product.name}</h3>
                        <p className="cart-drawer__price">{formatCurrency(item.product.price ?? 0)}</p>
                        <div className="cart-drawer__controls">
                          <label className="sr-only" htmlFor={`cart-qty-${item.product.id}`}>
                            {cart.quantity}
                          </label>
                          <div className="cart-drawer__quantity">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label={cart.decrease}
                            >
                              −
                            </button>
                            <span id={`cart-qty-${item.product.id}`}>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label={cart.increase}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="cart-drawer__remove"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            {cart.remove}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <footer className="cart-drawer__footer">
              <div className="cart-drawer__summary">
                <span>{cart.subtotal}</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <button type="button" className="cart-drawer__checkout" disabled={items.length === 0}>
                {cart.checkout}
              </button>
            </footer>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default CartDrawer;
