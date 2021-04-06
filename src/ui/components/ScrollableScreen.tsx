import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { Title } from './Title';
import { Subtitle } from './Subtitle';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  subtitle: string;
}

export const ScrollableScreen = (props: Props) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: props.title,
    });
  }, [props.title, navigation]);

  return (
    <ScrollView
      onScrollToTop={() => console.log('onScrollToTop')}
      onScroll={() => console.log('onScroll')}
    >
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
