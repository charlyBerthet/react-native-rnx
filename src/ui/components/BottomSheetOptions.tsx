import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import type CommonViewProps from '../models/CommonViewProps';
import { useTheme } from '../../theme';

export interface BottomSheetOptionsProps {
  options: { text: string; onPress: () => void }[];
}

interface Props extends CommonViewProps, BottomSheetOptionsProps {
  height: number;
}

export const BottomSheetOptions = (props: Props) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.bgColor, height: props.height },
      ]}
    >
      {props.options.map((opt, idx) => {
        return (
          <TouchableOpacity key={idx} onPress={opt.onPress}>
            <Text
              style={[styles.btnTxt, { backgroundColor: theme.borderColor }]}
              primary
            >
              {opt.text}
            </Text>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnTxt: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    minWidth: 300,
    textAlign: 'center',
    fontSize: 20,
  },
});
