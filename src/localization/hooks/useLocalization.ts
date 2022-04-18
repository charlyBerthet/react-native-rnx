import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export const useLocalization = () => {
  const { t, i18n } = useTranslation('common');

  const localize = t;
  const setLanguage = useCallback(
    async (lang: string) => {
      i18n.changeLanguage(lang);
      await AsyncStorage.setItem('rnx:lang', lang);
    },
    [i18n]
  );

  return { localize, setLanguage };
};

export default useLocalization;
