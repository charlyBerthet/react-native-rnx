import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import useMainColors from '../../theme/hooks/useMainColors';
import useTheme from '../../theme/hooks/useTheme';
import type CommonTextProps from '../models/CommonTextProps';

interface Props extends CommonTextProps {
  children: string | (string | JSX.Element)[] | JSX.Element;
  primary?: boolean;
  secondary?: boolean;
  maxFontSizeMultiplier?: number | null;
}

export const Text = (props: Props) => {
  const theme = useTheme();
  const mainColors = useMainColors(props.secondary);
  const shouldUseMain = props.primary || props.secondary;
  return (
    <RNText
      style={[
        styles.root,
        { color: shouldUseMain ? mainColors.txt : theme.txtColor },
        props.style,
      ]}
      maxFontSizeMultiplier={props.maxFontSizeMultiplier}
    >
      {props.children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    fontWeight: '500',
  },
});
