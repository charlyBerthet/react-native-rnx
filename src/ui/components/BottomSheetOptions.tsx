import React from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {}

export const BottomSheetOptions = (props: Props) => {
  console.log(props);
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    height: 450,
    backgroundColor: 'red',
  },
});
