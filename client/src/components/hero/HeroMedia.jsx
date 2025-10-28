import { clsx } from "clsx";

function HeroMedia({ slides, activeIndex }) {
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
