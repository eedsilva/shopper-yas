import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";

const slides = [
  {
    id: 1,
    title: "Meet the Everyday Icons",
    description: "Layerable essentials crafted with mindful materials and timeless silhouettes.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 2,
    title: "Summer Linen Capsule",
    description: "Airy weaves, coastal tones, and tailoring that moves wherever you do.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 3,
    title: "After-Hours Glamour",
    description: "From twilight dinners to rooftop soirées — shimmer with subtle drama.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80"
  }
];

const AUTO_ROTATE_MS = 6000;

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slideCount);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  return (
    <section id="hero" className="hero">
      <div className="hero__media">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt="" // decorative background imagery
            className={clsx("hero__image", {
              "hero__image--active": index === activeIndex
            })}
            role="presentation"
          />
        ))}
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">New Season · Limited Run</p>
        <h1>{activeSlide.title}</h1>
        <p className="hero__description">{activeSlide.description}</p>
        <div className="hero__cta-group">
          <button type="button" className="hero__cta hero__cta--primary">
            Explore collection
          </button>
          <button type="button" className="hero__cta hero__cta--ghost">
            Watch the story
          </button>
        </div>
      </div>
      <div className="hero__controls" role="group" aria-label="Hero slides">
        <button
          type="button"
          className="hero__control"
          aria-label="Previous slide"
          onClick={() => setActiveIndex((activeIndex - 1 + slideCount) % slideCount)}
        >
          ←
        </button>
        <div className="hero__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={clsx("hero__dot", {
                "hero__dot--active": index === activeIndex
              })}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero__control"
          aria-label="Next slide"
          onClick={() => setActiveIndex((activeIndex + 1) % slideCount)}
        >
          →
        </button>
      </div>
    </section>
  );
}

export default HeroCarousel;
