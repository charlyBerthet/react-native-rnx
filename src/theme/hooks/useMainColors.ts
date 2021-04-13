import useTheme from './useTheme';

export const useMainColors = (
  secondary?: boolean
): { bg: string; txt: string } => {
  const theme = useTheme();
  return {
    bg: secondary ? theme.secondaryColor : theme.primaryColor,
    txt: secondary ? theme.secondaryTxtColor : theme.primaryTxtColor,
  };
};

export default useMainColors;
