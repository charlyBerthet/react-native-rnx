import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import useTheme from '../../theme/hooks/useTheme';

interface Props extends CommonTextProps {
  children: string | string[];
}

export const Text = (props: Props) => {
  const theme = useTheme();
  return (
    <RNText style={[styles.root, { color: theme.txtColor }, props.style]}>
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
