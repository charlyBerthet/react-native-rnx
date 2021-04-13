import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import useTheme from '../../theme/hooks/useTheme';
import useMainColors from '../../theme/hooks/useMainColors';

interface Props extends CommonTextProps {
  children: string | string[];
  primary?: boolean;
  secondary?: boolean;
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
