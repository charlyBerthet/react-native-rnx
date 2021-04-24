import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  label: string;
  title: string;
  isEnabled: boolean;
  onChange: (val: boolean) => void;
}

export const EnableDisableFeature = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.detail}>{props.label}</Text>
      </View>
      <Switch
        trackColor={{ false: 'gray', true: theme.primaryColor }}
        thumbColor={'white'}
        onValueChange={props.onChange}
        value={props.isEnabled}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: { flex: 1 },
  detail: {
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
  },
  switch: {
    paddingLeft: 12,
    marginRight: -11,
    paddingVertical: 3,
  },
});
