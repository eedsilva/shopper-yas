import { useEffect, useMemo, useState } from "react";

import { HeroContent, HeroControls, HeroMedia, heroSlides } from "./hero";
import type { HeroSlide } from "./hero";

const AUTO_ROTATE_MS = 6000;

function HeroCarousel(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const slideCount = heroSlides.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slideCount);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  const activeSlide = useMemo<HeroSlide>(
    () => heroSlides[activeIndex % slideCount],
    [activeIndex, slideCount]
  );

  const handleStep = (step: number) => {
    setActiveIndex((index) => (index + step + slideCount) % slideCount);
  };

  return (
    <section id="hero" className="hero">
      <HeroMedia slides={heroSlides} activeIndex={activeIndex} />
      <HeroContent slide={activeSlide} />
      <HeroControls
        slides={heroSlides}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        onStep={handleStep}
      />
    </section>
  );
}

export default HeroCarousel;
