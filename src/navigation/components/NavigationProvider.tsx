import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type Screen from '../models/Screen';

const Stack = createStackNavigator();

interface Props {
  screens: Screen[];
  initial?: string;
}

export const NavigationProvider = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.initial}>
        {props.screens.map((s) => (
          <Stack.Screen key={s.name} name={s.name} component={s.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
