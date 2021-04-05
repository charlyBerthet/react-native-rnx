import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import useTheme from '../../theme/hooks/useTheme';

interface Props extends CommonTextProps {
  children: string | string[];
}

export const Subtitle = (props: Props) => {
  const theme = useTheme();
  return (
    <Text style={[styles.root, { color: theme.txtColor }, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
    marginHorizontal: 20,
    maxWidth: 250,
    alignSelf: 'center',
  },
});
