import { useTranslation } from "react-i18next";

function HeroContent({ slide }) {
  const { t } = useTranslation();
  if (!slide) return null;

  return (
    <div className="hero__content">
      <p className="hero__eyebrow">{t("hero.eyebrow")}</p>
      <h1>{t(slide.titleKey)}</h1>
      <p className="hero__description">{t(slide.descriptionKey)}</p>
      <div className="hero__cta-group">
        <button type="button" className="hero__cta hero__cta--primary">
          {t("hero.ctaPrimary")}
        </button>
        <button type="button" className="hero__cta hero__cta--ghost">
          {t("hero.ctaSecondary")}
        </button>
      </div>
    </div>
  );
}

export default HeroContent;
