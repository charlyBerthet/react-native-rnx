import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { Title } from './Title';
import { Subtitle } from './Subtitle';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  subtitle: string;
}

export const ScrollableScreen = (props: Props) => {
  const navigation = useNavigation();
  const [isTitleVisibleInHeader, setIsTitleVisibleInHeader] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isTitleVisibleInHeader ? props.title : '',
    });
  }, [props.title, navigation, isTitleVisibleInHeader]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsTitleVisibleInHeader(event.nativeEvent.contentOffset.y > 40);
  };

  return (
    <ScrollView scrollEventThrottle={5} onScroll={onScroll}>
      <Title>{props.title}</Title>
      <SafeAreaView style={styles.root}>
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
