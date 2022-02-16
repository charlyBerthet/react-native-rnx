import { useColorScheme } from 'react-native';
import { getDarkColor, getLightColor } from '../constants/themes';

export const useTheme = () => {
  return useColorScheme() === 'dark' ? getDarkColor() : getLightColor();
};

export default useTheme;
