import * as React from 'react';
import { StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import { Text } from './Text';

interface Props extends CommonTextProps {
  children: string | string[];
  noMargin?: boolean;
  centered?: boolean;
  primary?: boolean;
  secondary?: boolean;
}

export const SectionTitleUppercase = (props: Props) => {
  return (
    <Text
      style={[
        styles.root,
        (props.noMargin || props.centered) && styles.noMargin,
        props.centered && styles.centered,
        (props.primary || props.secondary) && styles.main,
        props.style,
      ]}
      primary={props.primary && !props.secondary}
      secondary={props.secondary}
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
  main: {
    fontSize: 14,
  },
});
