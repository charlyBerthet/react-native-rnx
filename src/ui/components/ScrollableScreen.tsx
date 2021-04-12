import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { Title } from './Title';
import { Subtitle } from './Subtitle';
import { Link } from './Link';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  subtitle: string;
  headerRightButton?: {
    title: string;
    navigateTo: string;
  };
  headerLeftButton?: {
    title: string;
    navigateTo: string;
  };
}

export const ScrollableScreen = (props: Props) => {
  const navigation = useNavigation();
  const [isTitleVisibleInHeader, setIsTitleVisibleInHeader] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isTitleVisibleInHeader ? props.title : '',
      headerLeft: props.headerLeftButton
        ? () => (
            <Link
              title={props.headerLeftButton!!.title}
              onPress={() =>
                navigation.navigate(props.headerLeftButton!!.navigateTo)
              }
            />
          )
        : undefined,
      headerRight: props.headerRightButton
        ? () => (
            <Link
              title={props.headerRightButton!!.title}
              onPress={() =>
                navigation.navigate(props.headerRightButton!!.navigateTo)
              }
            />
          )
        : undefined,
    });
  }, [
    props.title,
    navigation,
    isTitleVisibleInHeader,
    props.headerRightButton,
    props.headerLeftButton,
  ]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsTitleVisibleInHeader(event.nativeEvent.contentOffset.y > 10);
  };

  return (
    <ScrollView scrollEventThrottle={5} onScroll={onScroll}>
      <View style={styles.root}>
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
        {props.children}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  bottomSpacer: {
    width: 10,
    height: 50,
  },
});
