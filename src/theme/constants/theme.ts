import defaultDarkTheme from '../constants/darkTheme';
import defaultLightTheme from '../constants/lightTheme';
import Theme from '../models/Theme';

let darkTheme = { ...defaultDarkTheme };
let lightTheme = { ...defaultLightTheme };

export const getDarkTheme = () => darkTheme;
export const getLightTheme = () => lightTheme;

export const setDarkTheme = (theme: Partial<Theme>) =>
  (darkTheme = { ...darkTheme, ...theme });
export const setLightTheme = (theme: Partial<Theme>) =>
  (lightTheme = { ...lightTheme, ...theme });
