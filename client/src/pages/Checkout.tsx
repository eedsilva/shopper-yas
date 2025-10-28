import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrder, confirmOrder, OrderCreatePayload } from "../api/orders";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartDrawer from "../components/cart/CartDrawer";
import { useCart } from "../contexts/CartContext";
import { useLocalization, useMessages } from "../contexts/LocalizationContext";

function Checkout(): JSX.Element {
  const navigate = useNavigate();
  const { items, subtotal, clearCart, closeCart } = useCart();
  const { formatCurrency } = useLocalization();
  const messages = useMessages();
  const [deliveryMethod, setDeliveryMethod] = useState<OrderCreatePayload["deliveryMethod"]>("correios");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "creating" | "confirming" | "confirmed">("idle");
  const [error, setError] = useState<string | null>(null);

  const {
    checkout: {
      title,
      subtitle,
      delivery,
      customer,
      summary,
      pix,
      actions,
      success
    }
  } = messages;

  useEffect(() => {
    closeCart();
  }, [closeCart]);

  useEffect(() => {
    if (items.length === 0 && !orderId) {
      navigate("/", { replace: true });
    }
  }, [items.length, navigate, orderId]);

  const cartItems = useMemo(
    () =>
      items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price ?? 0
      })),
    [items]
  );

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.value as OrderCreatePayload["deliveryMethod"];
    setDeliveryMethod(method);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status !== "idle" && status !== "confirmed") {
      return;
    }
    if (items.length === 0) {
      return;
    }

    try {
      setStatus("creating");
      setError(null);
      const order = await createOrder({
        customerName,
        customerEmail,
        deliveryMethod,
        items: cartItems,
        subtotal,
        deliveryFee,
        notes
      });
      setOrderId(order.id);
      setPixCode(order.pixCode);
      setStatus("idle");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleConfirm = async () => {
    if (!orderId || status === "confirming" || status === "confirmed") {
      return;
    }

    try {
      setStatus("confirming");
      setError(null);
      await confirmOrder(orderId);
      setStatus("confirmed");
      clearCart();
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const selectedDelivery = useMemo(
    () => delivery.options.find((option) => option.value === deliveryMethod) ?? delivery.options[0],
    [delivery.options, deliveryMethod]
  );

  const deliveryFee = selectedDelivery?.fee ?? 0;
  const orderTotal = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  return (
    <div className="checkout-shell">
      <Navigation />
      <main className="checkout-main">
        <section className="checkout-panel" aria-labelledby="checkout-heading">
          <header className="checkout-header">
            <p className="checkout-eyebrow">{subtitle}</p>
            <h1 id="checkout-heading">{title}</h1>
          </header>
          {error ? (
            <p role="alert" className="checkout-error">
              {error}
            </p>
          ) : null}
          <div className="checkout-grid">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <fieldset className="checkout-fieldset">
                <legend>{delivery.title}</legend>
                <div className="checkout-radio-group">
                  {delivery.options.map((option) => (
                    <label key={option.value} className="checkout-radio">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.value}
                        checked={deliveryMethod === option.value}
                        onChange={handleDeliveryChange}
                      />
                      <div>
                        <span>{option.label}</span>
                        <small>{option.description}</small>
                      </div>
                      <strong>{formatCurrency(option.fee)}</strong>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="checkout-fieldset">
                <legend>{customer.title}</legend>
                <label className="checkout-label" htmlFor="checkout-name">
                  {customer.name}
                  <input
                    id="checkout-name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder={customer.namePlaceholder}
                    required
                  />
                </label>
                <label className="checkout-label" htmlFor="checkout-email">
                  {customer.email}
                  <input
                    id="checkout-email"
                    type="email"
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                    placeholder={customer.emailPlaceholder}
                    required
                  />
                </label>
                <label className="checkout-label" htmlFor="checkout-notes">
                  {customer.notes}
                  <textarea
                    id="checkout-notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder={customer.notesPlaceholder}
                    rows={3}
                  />
                </label>
              </fieldset>

              <button
                type="submit"
                className="checkout-primary"
                disabled={status === "creating" || items.length === 0 || Boolean(orderId)}
              >
                {status === "creating" ? actions.processing : actions.generatePix}
              </button>
            </form>

            <aside className="checkout-summary">
              <h2>{summary.title}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.product.id}>
                    <div>
                      <p>{item.product.name}</p>
                      <small>
                        {summary.quantityLabel(item.quantity)} · {formatCurrency(item.product.price ?? 0)}
                      </small>
                    </div>
                    <strong>{formatCurrency((item.product.price ?? 0) * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <dl className="checkout-totals">
                <div>
                  <dt>{summary.subtotal}</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div>
                  <dt>{summary.delivery}</dt>
                  <dd>{formatCurrency(deliveryFee)}</dd>
                </div>
                <div className="checkout-grand">
                  <dt>{summary.total}</dt>
                  <dd>{formatCurrency(orderTotal)}</dd>
                </div>
              </dl>
              {orderId ? (
                <div className="checkout-pix">
                  <h3>{pix.title}</h3>
                  <p>{pix.instructions}</p>
                  <code>{pixCode}</code>
                  <button
                    type="button"
                    className="checkout-secondary"
                    onClick={handleConfirm}
                    disabled={status === "confirming" || status === "confirmed"}
                  >
                    {status === "confirming" ? actions.confirming : pix.confirmCta}
                  </button>
                </div>
              ) : null}
              {status === "confirmed" ? (
                <div className="checkout-success" role="status">
                  <h3>{success.title}</h3>
                  <p>{success.description}</p>
                  <button type="button" className="checkout-primary" onClick={() => navigate("/")}>
                    {success.backHome}
                  </button>
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default Checkout;
