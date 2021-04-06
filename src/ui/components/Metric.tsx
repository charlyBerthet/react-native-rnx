import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  value: string;
  label: string;
}

export const Metric = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, props.style]}>
      <Text style={[styles.value, { color: theme.txtColor }]}>
        {props.value}
      </Text>
      <Text style={[styles.label, { color: theme.txtColor }]}>
        {props.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 100,
    alignSelf: 'center',
  },
});
