import React from 'react';
import { StyleSheet, View } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';
import { CardBg } from './CardBg';

interface Props extends CommonViewProps {
  value: string;
  title: string;
  valueSuffix?: string;
}

export const Metric = (props: Props) => {
  return (
    <CardBg style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{props.value}</Text>
        {!!props.valueSuffix && (
          <Text style={styles.valueSuffix}>{props.valueSuffix}</Text>
        )}
      </View>
    </CardBg>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    textAlign: 'left',
    fontSize: 35,
    fontWeight: '700',
  },
  title: { textAlign: 'left', fontWeight: '700', fontSize: 14 },
  valueSuffix: { textAlign: 'left', fontSize: 12, opacity: 0.5, marginLeft: 5 },
});
