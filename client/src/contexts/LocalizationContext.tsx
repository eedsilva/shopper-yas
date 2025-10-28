import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { translations } from "../i18n/translations";
import type { AppMessages, Locale } from "../i18n/translations";

interface LocaleConfig {
  intl: string;
  currency: string;
}

const localeConfig: Record<Locale, LocaleConfig> = {
  en: { intl: "en-US", currency: "USD" },
  "pt-BR": { intl: "pt-BR", currency: "BRL" },
  es: { intl: "es-ES", currency: "EUR" }
};

interface LocalizationContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: AppMessages;
  formatCurrency: (value: number) => string;
}

const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "shopperyas:locale";

const LocalizationContext = createContext<LocalizationContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => undefined,
  messages: translations[DEFAULT_LOCALE],
  formatCurrency: (value: number) =>
    new Intl.NumberFormat(localeConfig[DEFAULT_LOCALE].intl, {
      style: "currency",
      currency: localeConfig[DEFAULT_LOCALE].currency
    }).format(value)
});

interface LocalizationProviderProps {
  children: React.ReactNode;
}

function isLocale(value: string): value is Locale {
  return value in translations;
}

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && translations[stored]) {
    return stored;
  }

  const browserLocale = window.navigator.language;
  if (browserLocale && isLocale(browserLocale)) {
    return browserLocale;
  }

  const baseLocale = browserLocale?.split("-")[0];
  if (baseLocale && isLocale(baseLocale)) {
    return baseLocale;
  }

  return DEFAULT_LOCALE;
}

export function LocalizationProvider({ children }: LocalizationProviderProps): JSX.Element {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const value = useMemo<LocalizationContextValue>(() => {
    const config = localeConfig[locale];
    const formatter = new Intl.NumberFormat(config.intl, {
      style: "currency",
      currency: config.currency
    });

    return {
      locale,
      setLocale,
      messages: translations[locale],
      formatCurrency: (amount: number) => formatter.format(amount)
    };
  }, [locale]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization(): LocalizationContextValue {
  return useContext(LocalizationContext);
}

export function useMessages(): AppMessages {
  const { messages } = useLocalization();
  return messages;
}

export type { Locale };
