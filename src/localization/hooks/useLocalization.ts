import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation('common');
  const localize = t;
  const setLanguage = i18n.changeLanguage;

  return { localize, setLanguage };
};

export default useLocalization;
