import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

import useTheme from '../../theme/hooks/useTheme';

interface Props {
  children: string;
}

export const Subtitle = (props: Props) => {
  const theme = useTheme();
  return (
    <Text style={[styles.root, { color: theme.txtColor }]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 10,
    marginHorizontal: 20,
  },
});
