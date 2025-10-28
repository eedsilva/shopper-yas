import { useEffect, useMemo, useState } from "react";

import { useMessages } from "../contexts/LocalizationContext";
import { HeroContent, HeroControls, HeroMedia } from "./hero";
import type { HeroSlide } from "./hero";

const AUTO_ROTATE_MS = 6000;

function HeroCarousel(): JSX.Element {
  const { hero } = useMessages();
  const heroSlides = hero.slides;
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
      <HeroContent
        slide={activeSlide}
        eyebrow={hero.eyebrow}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />
      <HeroControls
        slides={heroSlides}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        onStep={handleStep}
        labels={hero.controls}
      />
    </section>
  );
}

export default HeroCarousel;
