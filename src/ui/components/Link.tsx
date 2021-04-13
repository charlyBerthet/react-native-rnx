import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useMainColors } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title: string;
  onPress?: () => void;
  secondary?: boolean;
}

export const Link = (props: Props) => {
  const mainColors = useMainColors(props.secondary);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style]}
    >
      <Text style={[styles.title, { color: mainColors.txt }]}>
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
