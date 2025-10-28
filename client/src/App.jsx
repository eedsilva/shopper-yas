import Navigation from "./components/Navigation";
import HeroCarousel from "./components/HeroCarousel";
import FeatureHighlights from "./components/FeatureHighlights";
import ProductShowcase from "./components/ProductShowcase";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
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
    </div>
  );
}

export default App;
