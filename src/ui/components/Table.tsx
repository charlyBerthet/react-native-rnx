import React from 'react';
import { View, StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { RowModel, Row } from './Row';

interface Props extends CommonViewProps {
  rows: RowModel[];
}

export const Table = (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      {props.rows.map((row, idx) => (
        <Row key={idx} {...row} hasBorderBottom={true} hasBorderTop={!idx} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});
