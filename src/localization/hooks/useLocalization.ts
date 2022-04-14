import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation('common');

  const localize = t;
  const setLanguage = i18n.changeLanguage;

  const getAvailableLanguages = useCallback(() => {
    return i18n.languages;
  }, [i18n]);

  return { localize, setLanguage, getAvailableLanguages };
};

export default useLocalization;
