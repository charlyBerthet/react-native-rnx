import * as React from 'react';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Tab } from '../models/Screen';
import { Stack } from 'react-native-rnx';
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

  console.log('TESTTTTTTTTTTTAAAAA');

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
    </TabNav.Navigator>
  );
}
