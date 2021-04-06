import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import useTheme from '../../theme/hooks/useTheme';

interface Props extends CommonTextProps {
  children: string | string[];
  noMargin?: boolean;
  centered?: boolean;
  primary?: boolean;
}

export const SectionTitleUppercase = (props: Props) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        styles.root,
        { color: props.primary ? theme.primaryColor : theme.txtColor },
        props.noMargin && styles.noMargin,
        props.centered && styles.centered,
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 20,
  },
  noMargin: {
    marginLeft: 0,
    marginBottom: 0,
  },
  centered: {
    textAlign: 'center',
  },
});
