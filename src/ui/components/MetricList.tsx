import React from 'react';
import { View, StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Metric } from './Metric';

interface Props extends CommonViewProps {
  metrics: {
    value: string;
    title: string;
    detail: string;
  }[];
}

export const MetricList = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.metrics.map((m, i) => (
        <Metric
          style={styles.card}
          key={i}
          value={m.value}
          title={m.title}
          detail={m.detail}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  card: {
    marginHorizontal: 2,
    flex: 1,
  },
});
