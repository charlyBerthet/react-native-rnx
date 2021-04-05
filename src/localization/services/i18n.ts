import { initReactI18next } from 'react-i18next';
import i18next, { Resource } from 'i18next';
import RNLocalize from 'react-native-localize';

export const initLocalization = (_resources: { lng: string; file: any }[]) => {
  const locale = RNLocalize.getLocales()[0].languageCode.substr(0, 2);
  const resources: Resource = {};
  for (const res of _resources) {
    resources[res.lng as string] = {
      common: res.file,
    };
  }
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: locale, // language to use
    fallbackLng: 'en',
    resources,
  });
};
