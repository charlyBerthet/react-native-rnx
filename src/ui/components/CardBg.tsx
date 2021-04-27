import React from 'react';
import { StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { ColoredBg } from './ColoredBg';

interface Props extends CommonViewProps {
  children: JSX.Element | (JSX.Element | false | undefined)[];
  secondary?: boolean;
  color?: string;
}

export const CardBg = (props: Props) => {
  return (
    <ColoredBg
      style={[styles.root, props.style]}
      secondary={props.secondary}
      color={props.color}
    >
      {props.children}
    </ColoredBg>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
