import { clsx } from "clsx";

import type { HeroSlide } from "../../types";

interface HeroMediaProps {
  slides: ReadonlyArray<HeroSlide>;
  activeIndex: number;
}

function HeroMedia({ slides, activeIndex }: HeroMediaProps): JSX.Element {
  return (
    <div className="hero__media">
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image}
          alt=""
          className={clsx("hero__image", {
            "hero__image--active": index === activeIndex
          })}
          role="presentation"
        />
      ))}
    </div>
  );
}

export default HeroMedia;
