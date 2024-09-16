import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarButton } from './TabBarButton';
import { Tab } from '../models/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends BottomTabBarProps {}

export function TabBar(
  tabs: {
    [name: string]: Tab;
  },
  extraBottomView?: JSX.Element,
  extraBottomViewHiddenForScreenNames?: string[]
) {
  return function ({ state, descriptors, navigation }: Props) {
    const currentRouteName =
      !state.routes[state.index].state ||
      !state.routes[state.index].state!!.index
        ? state.routes[state.index].name
        : state.routes[state.index].state!!.routes[
            state.routes[state.index].state!!.index!!
          ].name;

    const isCurrentRouteTabBar = !!currentRouteName && !!tabs[currentRouteName];

    const isExtraBottomViewHidden =
      !!extraBottomViewHiddenForScreenNames &&
      extraBottomViewHiddenForScreenNames.includes(currentRouteName);

    return (
      <View style={styles.root}>
        <SafeAreaView edges={['bottom', 'right', 'left']}>
          <View
            style={[
              styles.tabBarContentContainer,
              !isCurrentRouteTabBar && styles.tabBarContentContainerHidden,
            ]}
          >
            {state.routes.map((route, index) => (
              <TabBarButton
                route={route}
                index={index}
                key={route.key + '--' + index}
                descriptors={descriptors}
                state={state}
                navigation={navigation}
                tabs={tabs}
              />
            ))}
          </View>
          {!!extraBottomView && (
            <View
              style={isExtraBottomViewHidden && styles.extraBottomViewHidden}
            >
              {extraBottomView}
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  root: {},
  tabBarContentContainer: {
    flexDirection: 'row',
    shadowColor: 'transparent',
  },
  tabBarContentContainerHidden: {
    display: 'none',
  },
  extraBottomViewHidden: {
    display: 'none',
  },
});
