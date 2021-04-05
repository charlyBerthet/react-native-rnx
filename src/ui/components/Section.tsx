import React from 'react';
import { StyleSheet, View } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { SectionTitleUppercase } from './SectionTitleUppercase';
import { Card } from './Card';
import type { CardModel } from '../models/CardModel';

interface Props extends CommonViewProps {
  title: string;
  cards: CardModel[];
}

export const Section = (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <SectionTitleUppercase>{props.title}</SectionTitleUppercase>
      {props.cards.map((card, idx) => (
        <Card key={idx} {...card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});
