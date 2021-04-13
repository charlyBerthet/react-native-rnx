import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useMainColors } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  children: JSX.Element | JSX.Element[];
  secondary?: boolean;
}

export const CardBg = (props: Props) => {
  const mainColors = useMainColors(props.secondary);
  return (
    <View style={[styles.root, props.style]}>
      <View style={[styles.bg, { backgroundColor: mainColors.bg }]} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.14,
  },
});
