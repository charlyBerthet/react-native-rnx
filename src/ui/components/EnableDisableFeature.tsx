import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  label: string;
  isEnabled: boolean;
  onChange: (val: boolean) => void;
}

export const EnableDisableFeature = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.detail}>{props.label}</Text>
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
    paddingVertical: 7,
  },
  detail: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  switch: {
    paddingLeft: 12,
    marginRight: -10,
    paddingVertical: 3,
  },
});
