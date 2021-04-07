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
    <View style={styles.root}>
      <Text style={styles.detail}>{props.label}</Text>
      <Switch
        trackColor={{ false: theme.txtColor, true: theme.primaryColor }}
        thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
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
  },
  switch: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
