import { useCart } from "../../contexts/CartContext";
import { useMessages } from "../../contexts/LocalizationContext";

import LanguageSwitcher from "./LanguageSwitcher";

function NavigationActions(): JSX.Element {
  const { totalItems, toggleCart } = useCart();
  const { navigation } = useMessages();
  const { cartCta, openCart, cartWithCount } = navigation.actions;

  const cartLabel = totalItems > 0 ? cartWithCount(totalItems) : openCart;

  const handleScrollToProducts = () => {
    const section = document.querySelector<HTMLElement>("#new-arrivals");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="navigation__actions">
      <LanguageSwitcher />
      <button type="button" className="navigation__icon" aria-label={cartLabel} onClick={toggleCart}>
        <span aria-hidden>🛍️</span>
        {totalItems > 0 ? <span className="navigation__badge">{totalItems}</span> : null}
      </button>
      <button type="button" className="navigation__cta" onClick={handleScrollToProducts}>
        {cartCta}
      </button>
    </div>
  );
}

export default NavigationActions;
