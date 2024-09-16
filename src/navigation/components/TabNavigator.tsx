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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tab } from '../models/Screen';
import { Stack, useTheme } from 'react-native-rnx';

const TabNav = createBottomTabNavigator();

interface Props {
  tabs: { [name: string]: Tab };
  hasExtraBottomView?: boolean;
  hideTabLabels?: boolean;
}

export function TabNavigator({
  tabs: tabsByScreenName,
  hasExtraBottomView,
  hideTabLabels,
}: Props) {
  const theme = useTheme();
  const { bottom: bottomSafeArea } = useSafeAreaInsets();

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
        tabBarIcon: ({ color }) => {
          return (
            <Icon
              name={tabsByScreenName[_tabNavProps.route.name].iconName}
              size={21}
              color={color}
              solid={true}
            />
          );
        },
        tabBarShowLabel: hideTabLabels ? false : true,
        tabBarActiveTintColor: theme.txtColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display:
            !routeName ||
            routeName === tabsByScreenName[_tabNavProps.route.name].initial
              ? 'flex'
              : 'none',
          marginBottom: hasExtraBottomView ? -bottomSafeArea : undefined,
          shadowColor: 'transparent',
        },
      };
    },
    [
      bottomSafeArea,
      hasExtraBottomView,
      hideTabLabels,
      tabsByScreenName,
      theme.txtColor,
    ]
  );

  return (
    <TabNav.Navigator screenOptions={buildTabNavigatorScreenOptions}>
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
    </TabNav.Navigator>
  );
}
