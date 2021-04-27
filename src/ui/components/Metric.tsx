import React from 'react';
import { StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';
import { CardBg } from './CardBg';

interface Props extends CommonViewProps {
  value: string;
  title: string;
  detail?: string;
}

export const Metric = (props: Props) => {
  return (
    <CardBg style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{props.value}</Text>
      {/* {!!props.detail && <Text style={styles.detail}>{props.detail}</Text>} */}
    </CardBg>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  value: {
    textAlign: 'left',
    fontSize: 35,
    fontWeight: '700',
  },
  title: { textAlign: 'left', fontWeight: '700', fontSize: 14 },
  detail: { textAlign: 'left', fontSize: 12 },
});
