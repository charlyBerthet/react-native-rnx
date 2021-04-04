import { useColorScheme } from 'react-native';
import lightTheme from '../constants/lightTheme';
import darkTheme from '../constants/darkTheme';

export const useTheme = () => {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
};

export default useTheme;
