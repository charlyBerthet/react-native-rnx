import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
          fontWeight: '900',
          fontSize: 15,
        },
        headerStyle: {
          backgroundColor: theme.bgColor,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
        headerBackTitleStyle: {
          color: theme.primaryColor,
          fontSize: 14,
          fontWeight: '500',
        },
        headerBackImage: () => (
          <Icon name={'chevron-left'} size={21} color={theme.primaryColor} />
        ),
        headerTitle: '',
      }}
    >
      {props.screens.map((s) => (
        <_Stack.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            headerShown: true,
          }}
        />
      ))}
    </_Stack.Navigator>
  );
};
