import { useEffect, useRef } from "react";

import CartDrawer from "../components/cart/CartDrawer";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProductShowcase from "../components/ProductShowcase";
import { useMessages } from "../contexts/LocalizationContext";

function Collections(): JSX.Element {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { products } = useMessages();

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) {
      return;
    }

    heading.focus();
  }, []);

  return (
    <div className="app-shell">
      <Navigation />
      <main>
        <h1 id="collections-heading" ref={headingRef} className="sr-only" tabIndex={-1}>
          {products.sectionTitle}
        </h1>
        <ProductShowcase />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default Collections;
