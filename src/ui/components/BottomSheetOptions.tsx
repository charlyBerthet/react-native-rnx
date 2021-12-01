import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import type CommonViewProps from '../models/CommonViewProps';
import { useTheme } from '../../theme';
import type { BottomSheetProps } from './BottomSheet';

export interface BottomSheetOptionsProps extends BottomSheetProps {
  title?: string;
  message?: string;
  options?: { text: string; onPress: () => void; primary?: boolean }[];
  inline?: boolean;
}

interface Props extends CommonViewProps, BottomSheetOptionsProps {}

export const BottomSheetOptions = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root]}>
      {!!props.title && (
        <Text style={[styles.title, { backgroundColor: theme.bgColor }]}>
          {props.title}
        </Text>
      )}
      {!!props.message && (
        <Text style={[styles.message, { backgroundColor: theme.bgColor }]}>
          {props.message}
        </Text>
      )}
      {!!props.element && <props.element />}
      {!!props.options && (
        <View style={[styles.btns, props.inline && styles.btnsInline]}>
          {props.options.map((opt, idx) => {
            return (
              <TouchableOpacity
                style={[
                  styles.btn,
                  props.inline && styles.btnInline,
                  { backgroundColor: theme.bgColor },
                  idx !== 0 && styles.btnBorderTop,
                  idx !== 0 && { borderColor: theme.borderColor },
                ]}
                key={idx}
                onPress={opt.onPress}
              >
                <Text style={[styles.btnTxt]} primary={opt.primary}>
                  {opt.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 30,
    marginTop: 30,
  },
  btns: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 300,
  },
  btnsInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnInline: {
    marginHorizontal: 13,
    minWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 55,
    width: 55,
    borderRadius: 10,
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  btnBorderTop: {
    borderTopWidth: 0.5,
  },
});
