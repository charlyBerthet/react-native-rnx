import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useTheme from '../../theme/hooks/useTheme';
import type { Stack } from './Stack';

const _Tab = createBottomTabNavigator();

interface TabProps {
  name: string;
  title?: string;
  children: typeof Stack;
}

export const Tab = (props: TabProps) => {
  return (
    <_Tab.Screen
      key={props.name}
      name={props.name}
      component={props.children}
      options={{
        title: props.title || props.name,
      }}
    />
  );
};

interface Props {
  children: JSX.Element[];
}

export const Router = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
      <NavigationContainer>
        <_Tab.Navigator>{props.children}</_Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
