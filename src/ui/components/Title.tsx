import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import useTheme from '../../theme/hooks/useTheme';

interface Props extends CommonTextProps {
  children: string | string[];
  textAlign?: 'center' | 'left' | 'right';
}

export const Title = (props: Props) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        styles.root,
        { color: theme.txtColor, textAlign: props.textAlign || 'center' },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 27,
    fontWeight: '700',
    marginHorizontal: 20,
  },
});
