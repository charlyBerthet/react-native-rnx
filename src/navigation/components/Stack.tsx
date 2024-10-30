import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import useTheme from '../../theme/hooks/useTheme';
import type Screen from '../models/Screen';
import { useLocalization } from 'react-native-rnx';

const _Stack = createStackNavigator();

interface Props {
  screens: Screen[];
  initial?: string;
}

export const Stack = (props: Props) => {
  const theme = useTheme();
  const { localize } = useLocalization();
  return React.useMemo(() => {
    console.log('[RNX][RENDER] Stack');
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
          headerBackTitleStyle: {
            color: theme.primaryColor,
            fontSize: 14,
            fontWeight: '500',
          },
          headerBackImage: () => (
            <Icon
              style={styles.backBtnIcon}
              name={'chevron-left'}
              size={21}
              color={theme.primaryColor}
            />
          ),
          headerBackTitle: localize('global.back'),
          headerTitle: '',
        }}
      >
        {props.screens.map((s) => (
          <_Stack.Screen
            key={s.name}
            name={s.name}
            component={s.component}
            options={{
              headerShown: s.headerShown === false ? false : true,
              headerBackTitle: localize('global.back'),
              presentation: s.presentation,
              gestureDirection: s.gestureDirection,
              headerTitle: s.title || '',
            }}
          />
        ))}
      </_Stack.Navigator>
    );
  }, [
    localize,
    props.initial,
    props.screens,
    theme.bgColor,
    theme.primaryColor,
    theme.txtColor,
  ]);
};

const styles = StyleSheet.create({
  backBtnIcon: {
    paddingLeft: 10,
    paddingRight: 4,
  },
});
