import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { Title } from './Title';
import { Subtitle } from './Subtitle';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  subtitle: string;
}

export const ScrollableScreen = (props: Props) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.root}>
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
        {props.children}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
});
