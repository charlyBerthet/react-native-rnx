import * as React from 'react';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Tab } from '../models/Screen';
import { Stack } from 'react-native-rnx';
import { TabBarWithParams } from './TabBar';

const TabNav = createBottomTabNavigator();

interface Props {
  tabs: { [name: string]: Tab };
  hideTabLabels?: boolean;
  extraBottomView?: JSX.Element;
  extraBottomViewHiddenForScreenNames?: string[];
  extraViews?: React.ReactNode;
}

export function TabNavigator({
  tabs: tabsByScreenName,
  hideTabLabels,
  extraBottomView,
  extraBottomViewHiddenForScreenNames,
  extraViews,
}: Props) {
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
      return {
        headerShown: false,
        tabBarShowLabel: hideTabLabels ? false : true,
      };
    },
    [hideTabLabels]
  );

  return (
    <TabNav.Navigator
      screenOptions={buildTabNavigatorScreenOptions}
      tabBar={TabBarWithParams(
        tabsByScreenName,
        extraBottomView,
        extraBottomViewHiddenForScreenNames,
        extraViews
      )}
    >
      {tabs.map((s) => (
        <TabNav.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title || '',
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
