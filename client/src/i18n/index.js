import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ptBR from "../locales/pt-BR.json";
import es from "../locales/es.json";

const resources = {
  en: { translation: en },
  "pt-BR": { translation: ptBR },
  es: { translation: es }
};

const savedLanguage =
  typeof window !== "undefined" ? window.localStorage.getItem("appLanguage") : null;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (language) => {
    window.localStorage.setItem("appLanguage", language);
  });
}

export default i18n;
