import * as React from 'react';
import { StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import { Text } from './Text';

interface Props extends CommonTextProps {
  children: string | string[];
  primary?: boolean;
  secondary?: boolean;
}

export const SectionTitle = (props: Props) => {
  return (
    <Text
      style={[styles.root, props.style]}
      primary={props.primary && !props.secondary}
      secondary={props.secondary}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 18,
    fontWeight: '700',
  },
});
