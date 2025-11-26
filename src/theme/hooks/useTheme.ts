import { getLightColor } from 'lib/typescript';
import { useColorScheme } from 'react-native';
import { getDarkTheme } from '../constants/theme';

export const useTheme = () => {
  return useColorScheme() === 'dark' ? getDarkTheme() : getLightColor();
};

export default useTheme;
