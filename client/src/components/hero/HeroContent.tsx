import type { HeroSlide } from "../../types";

interface HeroContentProps {
  slide: HeroSlide;
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
}

function HeroContent({ slide, eyebrow, primaryCta, secondaryCta }: HeroContentProps): JSX.Element {
  return (
    <div className="hero__content">
      <p className="hero__eyebrow">{eyebrow}</p>
      <h1>{slide.title}</h1>
      <p className="hero__description">{slide.description}</p>
      <div className="hero__cta-group">
        <button type="button" className="hero__cta hero__cta--primary">
          {primaryCta}
        </button>
        <button type="button" className="hero__cta hero__cta--ghost">
          {secondaryCta}
        </button>
      </div>
    </div>
  );
}

export default HeroContent;
