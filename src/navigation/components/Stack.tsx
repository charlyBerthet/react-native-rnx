import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useTheme from '../../theme/hooks/useTheme';
import type ScreenModel from '../models/Screen';

const _Stack = createStackNavigator();

export const Screen = (props: ScreenModel) => {
  return (
    <_Stack.Screen
      key={props.name}
      name={props.name}
      component={props.component}
      options={{
        headerShown: props.isHeaderVisible,
      }}
    />
  );
};

interface Props {
  children: typeof Screen | typeof Screen[];
  initial?: string;
}

export const Stack = (props: Props) => {
  const theme = useTheme();
  return (
    <_Stack.Navigator
      initialRouteName={props.initial}
      screenOptions={{
        headerTintColor: theme.txtColor,
        headerStyle: {
          backgroundColor: theme.bgColor,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
        headerTitle: '',
      }}
    >
      {props.children}
    </_Stack.Navigator>
  );
};
