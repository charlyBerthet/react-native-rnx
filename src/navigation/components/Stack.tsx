import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useTheme from '../../theme/hooks/useTheme';
import type Screen from '../models/Screen';

const _Stack = createStackNavigator();

interface Props {
  screens: Screen[];
  initial?: string;
}

export const Stack = (props: Props) => {
  const theme = useTheme();
  return (
    <_Stack.Navigator
      initialRouteName={props.initial}
      screenOptions={{
        headerTintColor: theme.txtColor,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 14,
        },
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
      {props.screens.map((s) => (
        <_Stack.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            headerShown: s.isHeaderVisible,
          }}
        />
      ))}
    </_Stack.Navigator>
  );
};
