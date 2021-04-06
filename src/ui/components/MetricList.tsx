import React from 'react';
import { View, StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Metric } from './Metric';

interface Props extends CommonViewProps {
  metrics: {
    value: string;
    label: string;
  }[];
}

export const MetricList = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.metrics.map((m, i) => (
        <Metric key={i} value={m.value} label={m.label} />
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
});
