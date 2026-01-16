import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import type CommonTextProps from '../models/CommonTextProps';

interface Props extends CommonTextProps {
  children: string | string[];
  textAlign?: 'center' | 'left' | 'right';
  maxFontSizeMultiplier?: number | null | undefined;
}

export const Title = (props: Props) => {
  const theme = useTheme();
  return (
    <Text
      maxFontSizeMultiplier={props.maxFontSizeMultiplier}
      style={[
        styles.root,
        { color: theme.txtColor, textAlign: props.textAlign || 'center' },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 27,
    fontWeight: '700',
    marginHorizontal: 20,
  },
});
