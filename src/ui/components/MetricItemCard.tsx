import React from 'react';
import { View, StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';

interface Props extends CommonViewProps {
  value: string;
  title: string;
  detail?: string;
}

export const MetricItemCard = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text>{props.value}</Text>
      <View>
        <Text>{props.title}</Text>
        {!!props.detail && <Text>{props.detail}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
