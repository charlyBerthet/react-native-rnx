import { useColorScheme } from 'react-native';

export const useIsDarkTheme = () => {
  return useColorScheme() === 'dark';
};

export default useIsDarkTheme;
