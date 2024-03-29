import * as React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

  const tabs = React.useMemo(
    () =>
      Object.keys(props.tabs).map((name) => ({
        name,
        ...props.tabs[name],
      })),
    [props.tabs]
  );

  return React.useMemo(() => {
    console.log('[RNX][RENDER] Router');
    return (
      <>
        <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
          <NavigationContainer
            theme={{
              dark: isDarkTheme,
              colors: {
                primary: theme.primaryColor,
                background: theme.bgColor,
                card: theme.bgColor,
                text: theme.txtColor,
                border: theme.bgColor,
                notification: theme.txtColor,
              },
            }}
          >
            {tabs.length > 1 ? ( // Multiple tabs: show bottom bar
              <Tab.Navigator
                screenOptions={(_tabNavProps) => {
                  const routeName = getFocusedRouteNameFromRoute(
                    _tabNavProps.route
                  );
                  console.log(
                    'Router.focusedRouteName',
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
                        routeName ===
                          props.tabs[_tabNavProps.route.name].initial
                          ? 'flex'
                          : 'none',
                      marginBottom: props.extraBottomView
                        ? -bottomSafeArea
                        : undefined,
                      shadowColor: 'transparent',
                    },
                  };
                }}
              >
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
          </NavigationContainer>
        </View>
        {props.extraBottomView}
        <BottomSheet />
      </>
    );
  }, [
    bottomSafeArea,
    isDarkTheme,
    props.extraBottomView,
    props.hideTabLabels,
    props.tabs,
    tabs,
    theme.bgColor,
    theme.primaryColor,
    theme.txtColor,
  ]);
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
