import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useMainColors } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  children: JSX.Element | JSX.Element[];
  secondary?: boolean;
  color?: string;
}

export const ColoredBg = (props: Props) => {
  const mainColors = useMainColors(props.secondary);
  const isDarkTheme = useColorScheme() === 'dark';
  return (
    <View style={[styles.root, props.style]}>
      <View
        style={[
          styles.bg,
          { backgroundColor: props.color || mainColors.bg },
          isDarkTheme && styles.bgDark,
        ]}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.14,
  },
  bgDark: {
    opacity: 0.4,
  },
});
