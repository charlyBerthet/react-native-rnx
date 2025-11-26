import { useColorScheme } from 'react-native';
import { getDarkTheme, getLightTheme } from '../constants/theme';

export const useTheme = () => {
  return useColorScheme() === 'dark' ? getDarkTheme() : getLightTheme();
};

export default useTheme;
