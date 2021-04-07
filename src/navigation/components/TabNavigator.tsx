import * as React from 'react';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import type Screen from '../models/Screen';
import { Stack } from './Stack';
import useTheme from '../../theme/hooks/useTheme';

const Tab = createBottomTabNavigator();

export interface TabModel {
  screens: Screen[];
  initial?: string;
  title?: string;
  iconName: string;
  iconSize?: number;
}

interface Props {
  tabs: {
    [name: string]: TabModel;
  };
}

export const TabNavigator = (props: Props) => {
  const theme = useTheme();
  const route = useRoute();
  console.log('route>>', route.name);

  const tabs = Object.keys(props.tabs).map((name) => ({
    name,
    ...props.tabs[name],
  }));

  return (
    <Tab.Navigator
      screenOptions={(navProps) => ({
        tabBarIcon: ({ color }) => {
          return (
            <Icon
              name={props.tabs[navProps.route.name].iconName}
              size={21}
              color={color}
              solid={true}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.primaryColor,
        inactiveTintColor: 'gray',
      }}
    >
      {tabs.map((s) => (
        <Tab.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title || s.name,
          }}
        >
          {(stackProps) => (
            <Stack {...stackProps} screens={s.screens} initial={s.initial} />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};
