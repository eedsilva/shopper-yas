import { clsx } from "clsx";

import type { HeroSlide } from "../../types";

interface HeroControlsProps {
  slides: ReadonlyArray<HeroSlide>;
  activeIndex: number;
  onSelect: (index: number) => void;
  onStep: (step: number) => void;
}

function HeroControls({ slides, activeIndex, onSelect, onStep }: HeroControlsProps): JSX.Element {
  return (
    <div className="hero__controls" role="group" aria-label="Hero slides">
      <button
        type="button"
        className="hero__control"
        aria-label="Previous slide"
        onClick={() => onStep(-1)}
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
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="hero__control"
        aria-label="Next slide"
        onClick={() => onStep(1)}
      >
        →
      </button>
    </div>
  );
}

export default HeroControls;
