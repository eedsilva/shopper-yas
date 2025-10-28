import { useLocalization, useMessages } from "../../contexts/LocalizationContext";
import type { Locale } from "../../contexts/LocalizationContext";

const localeOptions: ReadonlyArray<{ value: Locale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "pt-BR", label: "PT-BR" },
  { value: "es", label: "ES" }
];

function LanguageSwitcher(): JSX.Element {
  const { locale, setLocale } = useLocalization();
  const { navigation } = useMessages();

  return (
    <label className="navigation__language">
      <span className="sr-only">{navigation.actions.language}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LanguageSwitcher;
