import * as React from 'react';
import {
  ParamListBase,
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Tab } from '../models/Screen';
import { Stack, useTheme } from 'react-native-rnx';
import { TabBar } from './TabBar';

const TabNav = createBottomTabNavigator();

interface Props {
  tabs: { [name: string]: Tab };
  hideTabLabels?: boolean;
  extraBottomView?: JSX.Element;
  extraBottomViewHiddenForScreenNames?: string[];
}

export function TabNavigator({
  tabs: tabsByScreenName,
  hideTabLabels,
  extraBottomView,
  extraBottomViewHiddenForScreenNames,
}: Props) {
  const theme = useTheme();

  const tabs = React.useMemo(
    () =>
      Object.keys(tabsByScreenName).map((name) => ({
        name,
        ...tabsByScreenName[name],
      })),
    [tabsByScreenName]
  );

  const buildTabNavigatorScreenOptions = React.useCallback(
    (_tabNavProps: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }): BottomTabNavigationOptions => {
      const routeName = getFocusedRouteNameFromRoute(_tabNavProps.route);
      console.log(
        'RNX Router.focusedRouteName',
        routeName,
        'initial for this tab',
        tabsByScreenName[_tabNavProps.route.name].initial
      );
      return {
        headerShown: false,
        tabBarShowLabel: hideTabLabels ? false : true,
        tabBarActiveTintColor: theme.txtColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display:
            !routeName ||
            routeName === tabsByScreenName[_tabNavProps.route.name].initial
              ? 'flex'
              : 'none',
          shadowColor: 'transparent',
        },
      };
    },
    [hideTabLabels, tabsByScreenName, theme.txtColor]
  );

  return (
    <TabNav.Navigator
      screenOptions={buildTabNavigatorScreenOptions}
      tabBar={TabBar(
        tabsByScreenName,
        extraBottomView,
        extraBottomViewHiddenForScreenNames
      )}
    >
      {tabs.map((s) => (
        <TabNav.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title || '',
            tabBarButton: s.customButton,
          }}
        >
          {(stackProps) => (
            <Stack {...stackProps} screens={s.screens} initial={s.initial} />
          )}
        </TabNav.Screen>
      ))}
      {/* <TabNav.Group>{extraBottomView}</TabNav.Group> */}
    </TabNav.Navigator>
  );
}
