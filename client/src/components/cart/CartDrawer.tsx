import { clsx } from "clsx";

import { useCart } from "../../contexts/CartContext";
import { useLocalization, useMessages } from "../../contexts/LocalizationContext";

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

  return (
    <div className={clsx("cart-drawer", { "cart-drawer--open": isOpen })} aria-hidden={!isOpen}>
      <div className="cart-drawer__overlay" onClick={closeCart} aria-hidden />
      <aside className="cart-drawer__panel" role="dialog" aria-modal="true" aria-label={cart.title}>
        <header className="cart-drawer__header">
          <h2>{cart.title}</h2>
          <button type="button" aria-label={cart.close} onClick={closeCart}>
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
      </aside>
    </div>
  );
}

export default CartDrawer;
