import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

import useTheme from '../../theme/hooks/useTheme';

interface Props {
  children: string;
}

export const Title = (props: Props) => {
  const theme = useTheme();
  return (
    <Text style={[styles.root, { color: theme.txtColor }]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 5,
    marginHorizontal: 20,
    maxWidth: 300,
    alignSelf: 'center',
  },
});
