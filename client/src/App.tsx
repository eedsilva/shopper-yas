import CartDrawer from "./components/cart/CartDrawer";
import FeatureHighlights from "./components/FeatureHighlights";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
import Navigation from "./components/Navigation";
import ProductShowcase from "./components/ProductShowcase";
import Testimonials from "./components/Testimonials";

function App(): JSX.Element {
  return (
    <div className="app-shell">
      <Navigation />
      <main>
        <HeroCarousel />
        <FeatureHighlights />
        <ProductShowcase />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default App;
