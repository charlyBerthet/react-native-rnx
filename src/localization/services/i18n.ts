import { initReactI18next } from 'react-i18next';
import i18next, { Resource } from 'i18next';
import RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initLocalization = async (_resources: { [lng: string]: any }) => {
  let locale = RNLocalize.getLocales()[0].languageCode.substr(0, 2);

  const savedLang = await AsyncStorage.getItem('rnx:lang');
  if (savedLang && Object.keys(_resources).includes(savedLang)) {
    locale = savedLang;
  }

  const resources: Resource = {};
  for (const resLng in _resources) {
    resources[resLng] = {
      common: _resources[resLng],
    };
  }

  await i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    interpolation: { escapeValue: false },
    lng: locale,
    fallbackLng: 'en',
    resources,
  });
};
