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
  title?: string;
  titleElement?: JSX.Element;
  subtitle?: string;
  headerRightButton?: {
    title?: string;
    icon?: string;
    navigateTo?: string;
    onPress?: () => void;
    secondary?: boolean;
    destructive?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
  };
  headerLeftButton?: {
    title?: string;
    icon?: string;
    navigateTo?: string;
    onPress?: () => void;
    secondary?: boolean;
    destructive?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
  };
  headerBackground?: (props: { style: StyleProp<ViewStyle> }) => JSX.Element;
  headerLowDown?: boolean;
  scrollViewRef?: (ref: ScrollView | undefined) => void;
  forceTitleInHeader?: boolean;
  noScroll?: boolean;
}

const LOW_DOWN_MARGIN_TOP = 35;

export const ScrollableScreen = (props: Props) => {
  const navigation = useNavigation();
  const [isTitleVisibleInHeader, setIsTitleVisibleInHeader] = useState(false);
  const forceTitleInHeader = !!props.forceTitleInHeader || !!props.titleElement;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        forceTitleInHeader || isTitleVisibleInHeader
          ? props.titleElement || props.title
          : '',
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
              title={props.headerLeftButton!!.title || ''}
              icon={props.headerLeftButton!!.icon}
              onPress={() => {
                if (props.headerLeftButton!!.navigateTo) {
                  navigation.navigate(props.headerLeftButton!!.navigateTo);
                }
                if (props.headerLeftButton!!.onPress) {
                  props.headerLeftButton!!.onPress();
                }
              }}
              destructive={props.headerLeftButton!!.destructive}
              secondary={props.headerLeftButton!!.secondary}
              disabled={props.headerLeftButton!!.disabled}
              isLoading={props.headerLeftButton!!.isLoading}
            />
          )
        : undefined,
      headerBackground: props.headerBackground,
      headerRight: props.headerRightButton
        ? () => (
            <Link
              style={props.headerLowDown && styles.headerButtonLowDown}
              title={props.headerRightButton!!.title}
              icon={props.headerRightButton!!.icon}
              onPress={() => {
                if (props.headerRightButton!!.navigateTo) {
                  navigation.navigate(props.headerRightButton!!.navigateTo);
                }
                if (props.headerRightButton!!.onPress) {
                  props.headerRightButton!!.onPress();
                }
              }}
              destructive={props.headerRightButton!!.destructive}
              secondary={props.headerRightButton!!.secondary}
              disabled={props.headerRightButton!!.disabled}
              isLoading={props.headerRightButton!!.isLoading}
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
    forceTitleInHeader,
    props.titleElement,
  ]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsTitleVisibleInHeader(event.nativeEvent.contentOffset.y > 10);
  };

  const view = (
    <View style={[styles.root, props.noScroll && styles.rootNoScroll]}>
      {!forceTitleInHeader && !!props.title && <Title>{props.title}</Title>}
      {!!props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
      {props.children}
      {!!props.noScroll && <View style={styles.bottomSpacer} />}
    </View>
  );

  return props.noScroll ? (
    view
  ) : (
    <ScrollView
      scrollEventThrottle={5}
      onScroll={onScroll}
      ref={(ref) =>
        props.scrollViewRef ? props.scrollViewRef(ref || undefined) : null
      }
    >
      {view}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  rootNoScroll: {
    flex: 1,
  },
  bottomSpacer: {
    width: 10,
    height: 50,
  },
  headerButtonLowDown: {
    marginTop: LOW_DOWN_MARGIN_TOP,
  },
});
