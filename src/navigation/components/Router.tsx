import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type Screen from '../models/Screen';
import { Stack } from './Stack';
import useTheme from '../../theme/hooks/useTheme';

const Tab = createBottomTabNavigator();

interface Props {
  tabs: {
    [name: string]: {
      screens: Screen[];
      initial?: string;
      title?: string;
    };
  };
}

export const Router = (props: Props) => {
  const theme = useTheme();

  const tabs = Object.keys(props.tabs).map((name) => ({
    name,
    ...props.tabs[name],
  }));

  return (
    <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
      <NavigationContainer>
        {tabs.length > 1 ? ( // Multiple tabs, show bottom bar
          <Tab.Navigator>
            {tabs.map((s) => (
              <Tab.Screen
                key={s.name}
                name={s.name}
                options={{
                  title: s.title || s.name,
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
        ) : tabs.length === 1 ? ( // One tab, don't show bottom bar
          <Stack screens={tabs[0].screens} initial={tabs[0].initial} />
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
