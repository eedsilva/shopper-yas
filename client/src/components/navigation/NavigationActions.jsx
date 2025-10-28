import { useTranslation } from "react-i18next";

function NavigationActions() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    if (nextLanguage) {
      i18n.changeLanguage(nextLanguage);
    }
  };

  return (
    <div className="navigation__actions">
      <div className="navigation__language">
        <label htmlFor="language-select">{t("navigation.actions.languageLabel")}</label>
        <select
          id="language-select"
          value={currentLanguage}
          aria-label={t("navigation.actions.languageSelectAria")}
          onChange={handleLanguageChange}
        >
          <option value="en">{t("navigation.actions.language.en")}</option>
          <option value="pt-BR">{t("navigation.actions.language.ptBR")}</option>
          <option value="es">{t("navigation.actions.language.es")}</option>
        </select>
      </div>
      <button
        type="button"
        className="navigation__icon"
        aria-label={t("navigation.actions.searchAria")}
      >
        <span aria-hidden>🔍</span>
      </button>
      <button
        type="button"
        className="navigation__icon"
        aria-label={t("navigation.actions.favoritesAria")}
      >
        <span aria-hidden>🤍</span>
      </button>
      <button type="button" className="navigation__cta">
        {t("navigation.actions.cta")}
      </button>
    </div>
  );
}

export default NavigationActions;
