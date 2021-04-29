import React, { Fragment } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import { ColoredBg } from './ColoredBg';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

type Value = any;

interface Props extends CommonViewProps {
  options: {
    label: string;
    value: Value;
  }[];
  onChange: (newVal: Value) => void;
  value: Value;
}

export const TabSelector = (props: Props) => {
  const theme = useTheme();
  return (
    <ColoredBg style={[styles.root, props.style]}>
      {props.options.map((opt, idx) => {
        const isActive = opt.value === props.value;
        const isPreviousActive =
          !!idx && props.options[idx - 1].value === props.value;
        return (
          <Fragment key={opt.value.toString()}>
            {!!idx && !isActive && !isPreviousActive && (
              <View style={[styles.bar, { backgroundColor: theme.txtColor }]} />
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                isActive && styles.btnActive,
                isActive && {
                  backgroundColor: theme.bgColor,
                },
              ]}
              onPress={() => props.onChange(opt.value)}
            >
              <Text style={[styles.txt, isActive && styles.txtActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          </Fragment>
        );
      })}
    </ColoredBg>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    overflow: 'hidden',
    padding: 2,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 4,
  },
  btnActive: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bar: {
    height: 10,
    width: 1,
    opacity: 0.4,
  },
  txt: {
    fontSize: 12,
  },
  txtActive: {
    fontWeight: '700',
  },
});
