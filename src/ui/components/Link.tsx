import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useMainColors, useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title: string;
  onPress?: () => void;
  secondary?: boolean;
  destructive?: boolean;
}

export const Link = (props: Props) => {
  const mainColors = useMainColors(props.secondary);
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style]}
    >
      <Text
        style={[
          styles.title,
          {
            color: props.destructive ? theme.destructiveColor : mainColors.txt,
          },
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
