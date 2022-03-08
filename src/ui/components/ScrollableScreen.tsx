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
  titleElement?: () => JSX.Element;
  subtitle?: string;
  headerRightButtons?: {
    title?: string;
    icon?: string;
    iconSolid?: boolean;
    navigateTo?: string;
    onPress?: () => void;
    secondary?: boolean;
    destructive?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    defaultTxtColor?: boolean;
    paddingRight?: number;
    paddingLeft?: number;
  }[];
  headerLeftButton?: {
    title?: string;
    icon?: string;
    iconSolid?: boolean;
    navigateTo?: string;
    onPress?: () => void;
    secondary?: boolean;
    destructive?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    defaultTxtColor?: boolean;
  };
  headerBackground?: (props: { style: StyleProp<ViewStyle> }) => JSX.Element;
  headerLowDown?: boolean;
  scrollViewRef?: (ref: ScrollView | undefined) => void;
  forceTitleInHeader?: boolean;
  noScroll?: boolean;
  rootNoMargin?: boolean;
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
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
              style={[props.headerLowDown && styles.headerButtonLowDown]}
              title={props.headerLeftButton!!.title || ''}
              icon={props.headerLeftButton!!.icon}
              iconSolid={props.headerLeftButton!!.iconSolid}
              onPress={() => {
                if (props.headerLeftButton!!.navigateTo) {
                  navigation.navigate(props.headerLeftButton!!.navigateTo);
                }
                if (props.headerLeftButton!!.onPress) {
                  props.headerLeftButton!!.onPress();
                }
              }}
              defaultTxtColor={props.headerLeftButton!!.defaultTxtColor}
              destructive={props.headerLeftButton!!.destructive}
              secondary={props.headerLeftButton!!.secondary}
              disabled={props.headerLeftButton!!.disabled}
              isLoading={props.headerLeftButton!!.isLoading}
            />
          )
        : undefined,
      headerBackground: props.headerBackground,
      headerRight:
        props.headerRightButtons && props.headerRightButtons.length
          ? () => (
              <View style={styles.headerBtns}>
                {props.headerRightButtons!.map((btnProps, idx) => (
                  <Link
                    key={idx}
                    style={[
                      props.headerLowDown && styles.headerButtonLowDown,
                      btnProps.paddingLeft !== undefined && {
                        paddingLeft: btnProps.paddingLeft,
                      },
                      btnProps.paddingRight !== undefined && {
                        paddingRight: btnProps.paddingRight,
                      },
                    ]}
                    title={btnProps.title}
                    icon={btnProps.icon}
                    iconSolid={btnProps.iconSolid}
                    onPress={() => {
                      if (btnProps.navigateTo) {
                        navigation.navigate(btnProps.navigateTo);
                      }
                      if (btnProps.onPress) {
                        btnProps.onPress();
                      }
                    }}
                    defaultTxtColor={btnProps.defaultTxtColor}
                    destructive={btnProps.destructive}
                    secondary={btnProps.secondary}
                    disabled={btnProps.disabled}
                    isLoading={btnProps.isLoading}
                  />
                ))}
              </View>
            )
          : undefined,
    });
  }, [
    props.title,
    navigation,
    isTitleVisibleInHeader,
    props.headerRightButtons,
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
    <View
      style={[
        styles.root,
        props.noScroll && styles.rootNoScroll,
        props.rootNoMargin && styles.rootNoMargin,
      ]}
    >
      {!forceTitleInHeader && !!props.title && <Title>{props.title}</Title>}
      {!!props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
      {props.children}
    </View>
  );

  return props.noScroll ? (
    view
  ) : (
    <ScrollView
      scrollEventThrottle={5}
      onScroll={onScroll}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
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
  rootNoMargin: {
    marginHorizontal: 0,
  },
  rootNoScroll: {
    flex: 1,
  },
  headerButtonLowDown: {
    marginTop: LOW_DOWN_MARGIN_TOP,
  },
  headerBtns: {
    flexDirection: 'row',
  },
  headerButtonCompact: {},
});
