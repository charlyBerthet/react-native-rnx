import { useColorScheme } from 'react-native';
import darkTheme from '../constants/darkTheme';
import lightTheme from '../constants/lightTheme';

export const useTheme = () => {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
};

export default useTheme;
