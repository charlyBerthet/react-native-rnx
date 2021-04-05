import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type Screen from '../models/Screen';
import useTheme from '../../theme/hooks/useTheme';
import { Stack } from './Stack';

const Tab = createBottomTabNavigator();

interface Props {
  tabs: {
    screens: Screen[];
    initial?: string;
    name: string;
  }[];
}

export const Router = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
      <NavigationContainer>
        {props.tabs.length > 1 ? ( // Multiple tabs, show bottom bar
          <Tab.Navigator>
            {props.tabs.map((s) => (
              <Tab.Screen
                key={s.name}
                name={s.name}
                component={(stackProps) => (
                  <Stack
                    screens={s.screens}
                    initial={s.initial}
                    {...stackProps}
                  />
                )}
              />
            ))}
          </Tab.Navigator>
        ) : props.tabs.length === 1 ? ( // One tab, don't show bottom bar
          <Stack
            screens={props.tabs[0].screens}
            initial={props.tabs[0].initial}
          />
        ) : undefined}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
