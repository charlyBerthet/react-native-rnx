import * as React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TextStyle,
  StyleProp,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type Screen from '../models/Screen';
import { Stack } from './Stack';
import useTheme from '../../theme/hooks/useTheme';
import { BottomSheet } from '../../ui/components/BottomSheet';

const Tab = createBottomTabNavigator();

interface Props {
  hideTabLabels?: boolean;
  tabs: {
    [name: string]: {
      screens: Screen[];
      initial: string;
      title?: string;
      Icon: (props: {
        style: StyleProp<TextStyle>;
        width: number;
        height: number;
      }) => JSX.Element | null;
      ActiveIcon: (props: {
        style: StyleProp<TextStyle>;
        width: number;
        height: number;
      }) => JSX.Element | null;
      iconSize?: number;
    };
  };
  Onboarding?: JSX.Element;
}

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

const isTablet =
  (Platform.OS === 'ios' || Platform.OS === 'android') &&
  Math.min(width, height) >= 600 &&
  aspectRatio <= 1.6;

export const Router = (props: Props) => {
  const theme = useTheme();
  const isDarkTheme = useColorScheme() === 'dark';

  const tabs = React.useMemo(() => {
    return Object.keys(props.tabs).map((name) => ({
      name,
      ...props.tabs[name],
    }));
  }, [props.tabs]);

  console.log('[RNX] render router');
  React.useEffect(() => {
    console.log('[RNX] router first useEffect');
  }, []);

  return (
    <>
      <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
        <NavigationContainer
          theme={{
            dark: isDarkTheme,
            colors: {
              primary: theme.primaryColor,
              background: theme.bgColor,
              card: theme.bgColor,
              text: theme.txtColor,
              border: theme.bgColor,
              notification: theme.txtColor,
            },
          }}
        >
          {tabs.length > 1 ? ( // Multiple tabs: show bottom bar
            <Tab.Navigator
              screenOptions={(_tabNavProps) => {
                const routeName = getFocusedRouteNameFromRoute(
                  _tabNavProps.route
                );
                console.log(
                  'Router.focusedRouteName',
                  routeName,
                  'initial for this tab',
                  props.tabs[_tabNavProps.route.name].initial
                );
                return {
                  headerShown: false,
                  tabBarIcon: ({ focused }) => {
                    const TabIcon = props.tabs[_tabNavProps.route.name].Icon;
                    const TabActiveIcon =
                      props.tabs[_tabNavProps.route.name].ActiveIcon;
                    const iconSize =
                      props.tabs[_tabNavProps.route.name].iconSize || 22;
                    return focused ? (
                      <TabActiveIcon
                        width={iconSize}
                        height={iconSize}
                        style={[
                          {
                            color: theme.txtColor,
                          },
                        ]}
                      />
                    ) : (
                      <TabIcon
                        width={iconSize}
                        height={iconSize}
                        style={[
                          {
                            color: theme.txtColor,
                          },
                          styles.notFocusedIcon,
                        ]}
                      />
                    );
                  },
                  tabBarShowLabel: props.hideTabLabels ? false : true,
                  tabBarActiveTintColor: theme.primaryColor,
                  tabBarInactiveTintColor: theme.txtColor,
                  tabBarLabel: ({ focused }) => {
                    return (
                      <Text
                        style={[
                          styles.tabBarLabelStyle,
                          isTablet && styles.tabBarLabelStyleTablet,
                          {
                            color: theme.txtColor,
                          },
                          !focused && styles.notFocused,
                        ]}
                      >
                        {props.tabs[_tabNavProps.route.name].title}
                      </Text>
                    );
                  },
                  tabBarStyle: [
                    {
                      display:
                        !routeName ||
                        routeName ===
                          props.tabs[_tabNavProps.route.name].initial
                          ? 'flex'
                          : 'none',
                    },
                    null,
                  ],
                };
              }}
            >
              {tabs.map((s) => (
                <Tab.Screen
                  key={s.name}
                  name={s.name}
                  options={{
                    title: s.title || '',
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
          ) : tabs.length === 1 ? ( // One tab: don't show bottom bar
            <Stack screens={tabs[0].screens} initial={tabs[0].initial} />
          ) : undefined}
        </NavigationContainer>
      </View>
      {!!props.Onboarding && props.Onboarding}
      <BottomSheet />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: -4,
  },
  tabBarLabelStyleTablet: {
    marginTop: 0,
    marginLeft: 25,
  },
  notFocusedIcon: {
    opacity: 0.7,
  },
  notFocused: {
    opacity: 0.6,
  },
});
