import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

export interface RowModel {
  title: string;
  subtitle: string;
  rightLabel: string;
  rightLabelCaption: string;
}

interface Props extends CommonViewProps, RowModel {
  hasBorderTop?: boolean;
  hasBorderBottom?: boolean;
}

export const Row = (props: Props) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.root,
        props.hasBorderTop && styles.rootBorderTop,
        props.hasBorderBottom && styles.rootBorderBottom,
        props.hasBorderTop && { borderTopColor: theme.borderColor },
        props.hasBorderBottom && { borderBottomColor: theme.borderColor },
        props.style,
      ]}
    >
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.rightLabel}>{props.rightLabel}</Text>
        <Text style={styles.rightLabelCaption}>{props.rightLabelCaption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  rootBorderTop: {
    borderTopWidth: 0.5,
  },
  rootBorderBottom: {
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '700',
  },
  rightLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightLabelCaption: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
});
