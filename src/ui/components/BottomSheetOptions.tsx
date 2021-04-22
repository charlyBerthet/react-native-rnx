import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import type CommonViewProps from '../models/CommonViewProps';
import { useTheme } from '../../theme';

export interface BottomSheetOptionsProps {
  options: { text: string; onPress: () => void }[];
}

interface Props extends CommonViewProps, BottomSheetOptionsProps {}

export const BottomSheetOptions = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
      {props.options.map((opt, idx) => {
        return (
          <TouchableOpacity key={idx} onPress={opt.onPress}>
            <Text>{opt.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    height: 450,
  },
});
