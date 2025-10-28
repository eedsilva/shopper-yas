import { useTranslation } from "react-i18next";

function NewsletterForm() {
  const { t } = useTranslation();

  return (
    <form className="footer__form">
      <label htmlFor="email" className="sr-only">
        {t("newsletter.label")}
      </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder={t("newsletter.placeholder")}
        required
      />
      <button type="submit">{t("newsletter.submit")}</button>
    </form>
  );
}

export default NewsletterForm;
