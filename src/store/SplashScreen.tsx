import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

const Component = () => {
  const theme = useTheme();
  return <View style={[styles.root, { backgroundColor: theme.bgColor }]} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Component;
