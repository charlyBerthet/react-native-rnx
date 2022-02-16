import defaultDarkTheme from '../constants/darkTheme';
import defaultLightTheme from '../constants/lightTheme';
import type Theme from '../models/Theme';

let darkTheme = { ...defaultDarkTheme };
let lightTheme = { ...defaultLightTheme };

export const getDarkColor = () => darkTheme;
export const getLightColor = () => lightTheme;

export const setDarkColor = (theme: Partial<Theme>) =>
  (darkTheme = { ...darkTheme, ...theme });
export const setLightColor = (theme: Partial<Theme>) =>
  (lightTheme = { ...lightTheme, ...theme });
