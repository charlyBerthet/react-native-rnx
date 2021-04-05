import { initReactI18next } from 'react-i18next';
import i18next, { Resource } from 'i18next';
import RNLocalize from 'react-native-localize';

export const initLocalization = (_resources: { [lng: string]: any }[]) => {
  const locale = RNLocalize.getLocales()[0].languageCode.substr(0, 2);
  const resources: Resource = {};
  for (const resLng in _resources) {
    resources[resLng] = {
      common: _resources[resLng].file,
    };
  }
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: locale, // language to use
    fallbackLng: 'en',
    resources,
  });
};
