import { useTranslation } from "react-i18next";

function HighlightCard({ icon, titleKey, descriptionKey }) {
  const { t } = useTranslation();

  return (
    <article className="highlight-card">
      <span className="highlight-card__icon" aria-hidden>
        {icon}
      </span>
      <div className="highlight-card__body">
        <h3>{t(titleKey)}</h3>
        <p>{t(descriptionKey)}</p>
      </div>
    </article>
  );
}

export default HighlightCard;
