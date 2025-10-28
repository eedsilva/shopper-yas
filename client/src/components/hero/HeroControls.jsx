import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

function HeroControls({ slides, activeIndex, onSelect, onStep }) {
  const { t } = useTranslation();

  return (
    <div className="hero__controls" role="group" aria-label={t("hero.controls.groupAria")}>
      <button
        type="button"
        className="hero__control"
        aria-label={t("hero.controls.previousAria")}
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
            aria-label={t("hero.controls.showSlideAria", { index: index + 1 })}
            aria-pressed={index === activeIndex}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="hero__control"
        aria-label={t("hero.controls.nextAria")}
        onClick={() => onStep(1)}
      >
        →
      </button>
    </div>
  );
}

export default HeroControls;
