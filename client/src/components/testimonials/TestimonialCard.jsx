import { useTranslation } from "react-i18next";

function TestimonialCard({ quoteKey, nameKey, roleKey }) {
  const { t } = useTranslation();

  return (
    <figure>
      <blockquote>
        <p>“{t(quoteKey)}”</p>
      </blockquote>
      <figcaption>
        <span>{t(nameKey)}</span>
        <span>{t(roleKey)}</span>
      </figcaption>
    </figure>
  );
}

export default TestimonialCard;
