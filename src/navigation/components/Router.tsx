import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type Screen from '../models/Screen';
import useTheme from '../../theme/hooks/useTheme';

const Stack = createStackNavigator();

interface Props {
  routes: Screen[];
  initial?: string;
}

export const Router = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
      <NavigationContainer>
        <Stack.Navigator
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
          {props.routes.map((s) => (
            <Stack.Screen
              key={s.name}
              name={s.name}
              component={s.component}
              options={{
                headerShown: s.isHeaderVisible,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
