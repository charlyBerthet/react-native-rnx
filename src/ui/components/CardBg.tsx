import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  children: JSX.Element | JSX.Element[];
}

export const CardBg = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, props.style]}>
      <View style={[styles.bg, { backgroundColor: theme.primaryColor }]} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 7,
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
