import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type Screen from '../models/Screen';
import Theme from '../../theme';

const Stack = createStackNavigator();

interface Props {
  routes: Screen[];
  initial?: string;
}

export const Router = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={props.initial}
        screenOptions={{
          headerTintColor: Theme.txtColor,
          headerStyle: {
            backgroundColor: Theme.bgColor,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          headerTitle: '',
        }}
      >
        {props.routes.map((s) => (
          <Stack.Screen key={s.name} name={s.name} component={s.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
