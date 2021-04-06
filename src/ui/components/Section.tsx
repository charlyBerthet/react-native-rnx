import React from 'react';
import { StyleSheet, View } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { SectionTitleUppercase } from './SectionTitleUppercase';
import { Card } from './Card';
import { Text } from './Text';
import { SectionTitle } from './SectionTitle';
import type { CardModel } from '../models/CardModel';

interface Props extends CommonViewProps {
  title: string;
  subtitle?: string;
  upperCaseHeader?: boolean;
  cards: CardModel[];
}

export const Section = (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      {props.upperCaseHeader ? (
        <SectionTitleUppercase>{props.title}</SectionTitleUppercase>
      ) : (
        <SectionTitle>{props.title}</SectionTitle>
      )}
      {!!props.subtitle && <Text>{props.subtitle}</Text>}
      {props.cards.map((card, idx) => (
        <Card key={idx} {...card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 25,
  },
});
