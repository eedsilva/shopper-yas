import { clsx } from "clsx";

import type { HeroSlide } from "../../types";

interface HeroControlsProps {
  slides: ReadonlyArray<HeroSlide>;
  activeIndex: number;
  onSelect: (index: number) => void;
  onStep: (step: number) => void;
  labels: {
    previous: string;
    next: string;
    goToSlide: (index: number) => string;
    groupLabel: string;
  };
}

function HeroControls({ slides, activeIndex, onSelect, onStep, labels }: HeroControlsProps): JSX.Element {
  return (
    <div className="hero__controls" role="group" aria-label={labels.groupLabel}>
      <button
        type="button"
        className="hero__control"
        aria-label={labels.previous}
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
            aria-label={labels.goToSlide(index + 1)}
            aria-pressed={index === activeIndex}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="hero__control"
        aria-label={labels.next}
        onClick={() => onStep(1)}
      >
        →
      </button>
    </div>
  );
}

export default HeroControls;
