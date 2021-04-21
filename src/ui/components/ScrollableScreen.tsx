import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Title } from './Title';
import { Subtitle } from './Subtitle';
import { Link } from './Link';

interface Props {
  children:
    | JSX.Element
    | (JSX.Element | undefined | false | null)[]
    | undefined
    | false
    | null;
  title: string;
  subtitle: string;
  headerRightButton?: {
    title: string;
    navigateTo?: string;
    onPress?: () => void;
    secondary?: boolean;
  };
  headerLeftButton?: {
    title: string;
    navigateTo?: string;
    onPress?: () => void;
    secondary?: boolean;
  };
  headerBackground?: (props: { style: StyleProp<ViewStyle> }) => JSX.Element;
  headerLowDown?: boolean;
}

const LOW_DOWN_MARGIN_TOP = 35;

export const ScrollableScreen = (props: Props) => {
  const navigation = useNavigation();
  const [isTitleVisibleInHeader, setIsTitleVisibleInHeader] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isTitleVisibleInHeader ? props.title : '',
      headerStyle: {
        height: props.headerLowDown ? 110 : undefined,
      },
      headerTitleStyle: {
        fontWeight: '900',
        fontSize: 15,
        paddingTop: props.headerLowDown ? LOW_DOWN_MARGIN_TOP : undefined,
      },
      headerLeft: props.headerLeftButton
        ? () => (
            <Link
              style={props.headerLowDown && styles.headerButtonLowDown}
              title={props.headerLeftButton!!.title}
              onPress={() => {
                if (props.headerLeftButton!!.navigateTo) {
                  navigation.navigate(props.headerLeftButton!!.navigateTo);
                }
                if (props.headerLeftButton!!.onPress) {
                  props.headerLeftButton!!.onPress();
                }
              }}
              secondary={props.headerLeftButton!!.secondary}
            />
          )
        : undefined,
      headerBackground: props.headerBackground,
      headerRight: props.headerRightButton
        ? () => (
            <Link
              style={props.headerLowDown && styles.headerButtonLowDown}
              title={props.headerRightButton!!.title}
              onPress={() => {
                if (props.headerRightButton!!.navigateTo) {
                  navigation.navigate(props.headerRightButton!!.navigateTo);
                }
                if (props.headerRightButton!!.onPress) {
                  props.headerRightButton!!.onPress();
                }
              }}
              secondary={props.headerRightButton!!.secondary}
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
    props.headerBackground,
    props.headerLowDown,
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
  headerButtonLowDown: {
    marginTop: LOW_DOWN_MARGIN_TOP,
  },
});
