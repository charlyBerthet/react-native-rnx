import * as React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
  Theme,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type Screen from '../models/Screen';
import { Stack } from './Stack';
import useTheme from '../../theme/hooks/useTheme';
import { BottomSheet } from '../../ui/components/BottomSheet';

const Tab = createBottomTabNavigator();

interface Props {
  hideTabLabels?: boolean;
  extraBottomView?: JSX.Element;
  extraBottomViewHiddenForScreenNames?: string[];
  tabs: {
    [name: string]: {
      screens: Screen[];
      initial: string;
      title?: string;
      iconName: string;
      iconSize?: number;
      customButton?: () => JSX.Element;
    };
  };
}

export const Router = (props: Props) => {
  const theme = useTheme();
  const isDarkTheme = useColorScheme() === 'dark';
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const [focusedScreen, setFocusedScreen] = React.useState<string>();

  const extraBottomViewElement = React.useMemo(() => {
    return props.extraBottomViewHiddenForScreenNames &&
      focusedScreen &&
      props.extraBottomViewHiddenForScreenNames.includes(focusedScreen)
      ? undefined
      : props.extraBottomView;
  }, [
    props.extraBottomView,
    focusedScreen,
    props.extraBottomViewHiddenForScreenNames,
  ]);

  const tabs = React.useMemo(
    () =>
      Object.keys(props.tabs).map((name) => ({
        name,
        ...props.tabs[name],
      })),
    [props.tabs]
  );

  const navigationContainerTheme = React.useMemo<Theme>(
    () => ({
      dark: isDarkTheme,
      colors: {
        primary: theme.primaryColor,
        background: theme.bgColor,
        card: theme.bgColor,
        text: theme.txtColor,
        border: theme.bgColor,
        notification: theme.txtColor,
      },
    }),
    [isDarkTheme, theme.bgColor, theme.primaryColor, theme.txtColor]
  );

  const buildTabNavigatorScreenOptions = React.useCallback(
    (_tabNavProps: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }): BottomTabNavigationOptions => {
      const routeName = getFocusedRouteNameFromRoute(_tabNavProps.route);
      setFocusedScreen(routeName);
      console.log(
        'RNX Router.focusedRouteName',
        routeName,
        'initial for this tab',
        props.tabs[_tabNavProps.route.name].initial
      );
      return {
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return (
            <Icon
              name={props.tabs[_tabNavProps.route.name].iconName}
              size={21}
              color={color}
              solid={true}
            />
          );
        },
        tabBarShowLabel: props.hideTabLabels ? false : true,
        tabBarActiveTintColor: theme.txtColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display:
            !routeName ||
            routeName === props.tabs[_tabNavProps.route.name].initial
              ? 'flex'
              : 'none',
          marginBottom: extraBottomViewElement ? -bottomSafeArea : undefined,
          shadowColor: 'transparent',
        },
      };
    },
    [
      bottomSafeArea,
      extraBottomViewElement,
      props.hideTabLabels,
      props.tabs,
      theme.txtColor,
    ]
  );

  return React.useMemo(() => {
    console.log('[RNX][RENDER] Router');
    return (
      <>
        <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
          <NavigationContainer theme={navigationContainerTheme}>
            {tabs.length > 1 ? ( // Multiple tabs: show bottom bar
              <Tab.Navigator screenOptions={buildTabNavigatorScreenOptions}>
                {tabs.map((s) => (
                  <Tab.Screen
                    key={s.name}
                    name={s.name}
                    options={{
                      title: s.title || '',
                      tabBarButton: s.customButton,
                    }}
                  >
                    {(stackProps) => (
                      <Stack
                        {...stackProps}
                        screens={s.screens}
                        initial={s.initial}
                      />
                    )}
                  </Tab.Screen>
                ))}
              </Tab.Navigator>
            ) : tabs.length === 1 ? ( // One tab: don't show bottom bar
              <Stack screens={tabs[0].screens} initial={tabs[0].initial} />
            ) : undefined}
            {extraBottomViewElement}
          </NavigationContainer>
        </View>
        <BottomSheet />
      </>
    );
  }, [
    theme.bgColor,
    navigationContainerTheme,
    tabs,
    buildTabNavigatorScreenOptions,
    extraBottomViewElement,
  ]);
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
