import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';

interface Props extends CommonTextProps {
  children: string | string[];
}

export const SectionTitle = (props: Props) => {
  return <Text style={styles.root}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 19,
  },
});
