import translations_de from "../../translations/de.json";
import translations_en from "../../translations/de.json";
import { setDayjsLocale } from "../../utils/dayjs";
import { createIntl, createIntlCache } from "react-intl";
import { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";

export type TranslationKey = keyof typeof translations_de;
export type TranslationValues = Record<string, PrimitiveType | FormatXMLElementFn<string, string>>;

export type Locale = "de" | "en";

/** Configure typing of messages IDs and locale, see https://formatjs.io/docs/react-intl/#typing-message-ids-and-locale */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace FormatjsIntl {
    interface Message {
      ids: TranslationKey;
    }

    interface IntlConfig {
      locale: Locale;
    }
  }
}

const translations: { [index in Locale]: typeof translations_de } = {
  de: translations_de,
  en: translations_en,
};

export const initializeLanguage = (defaultLocale: Locale | undefined = undefined) => {
  // get language without region code (from browser!)
  const browserLocale = navigator.language.split(/[-_]/)[0];

  const locale = defaultLocale ?? (browserLocale in translations ? (browserLocale as Locale) : "de");
  const messages = translations[locale];

  setDayjsLocale(locale);

  return {
    locale,
    messages,
  };
};

const cache = createIntlCache();

export const intl = createIntl({ ...initializeLanguage(), defaultLocale: "de" }, cache);

export const { formatMessage } = intl;
