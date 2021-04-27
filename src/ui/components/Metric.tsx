import React from 'react';
import { StyleSheet, View } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';

interface Props extends CommonViewProps {
  value: string;
  title: string;
  detail?: string;
}

export const Metric = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.value}>{props.value}</Text>
      <Text style={styles.title}>{props.title}</Text>
      {!!props.detail && <Text style={styles.detail}>{props.detail}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
  title: { textAlign: 'center', fontWeight: '700', fontSize: 14 },
  detail: { textAlign: 'center', fontSize: 12 },
});
