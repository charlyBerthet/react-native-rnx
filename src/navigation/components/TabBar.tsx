import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarButton } from './TabBarButton';
import { Tab } from '../models/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends BottomTabBarProps {
  tabs: {
    [name: string]: Tab;
  };
  extraBottomView?: JSX.Element;
  extraBottomViewHiddenForScreenNames?: string[];
}

function TabBar({
  state,
  descriptors,
  navigation,
  tabs,
  extraBottomView,
  extraBottomViewHiddenForScreenNames,
}: Props) {
  const currentRouteName =
    !state.routes[state.index].state || !state.routes[state.index].state!!.index
      ? state.routes[state.index].name
      : state.routes[state.index].state!!.routes[
          state.routes[state.index].state!!.index!!
        ].name;

  const isCurrentRouteTabBar = !!currentRouteName && !!tabs[currentRouteName];
  const isTabBarVisible = !!isCurrentRouteTabBar;

  const isExtraBottomViewHidden =
    !!extraBottomViewHiddenForScreenNames &&
    extraBottomViewHiddenForScreenNames.includes(currentRouteName);

  return (
    <View style={styles.root}>
      <SafeAreaView
        edges={['bottom', 'right', 'left']}
        style={
          isExtraBottomViewHidden && !isTabBarVisible && styles.safeAreaHidden
        }
      >
        <View
          style={[
            styles.tabBarContentContainer,
            !isTabBarVisible && styles.tabBarContentContainerHidden,
          ]}
        >
          {state.routes.map((route, index) => {
            const CustomButton = tabs[route.name].customButton;
            if (CustomButton) {
              return (
                <CustomButton
                  navigation={navigation}
                  key={route.key + '--' + index}
                />
              );
            }
            return (
              <TabBarButton
                route={route}
                index={index}
                key={route.key + '--' + index}
                descriptors={descriptors}
                state={state}
                navigation={navigation}
                tabs={tabs}
              />
            );
          })}
        </View>
        {!!extraBottomView && (
          <View style={isExtraBottomViewHidden && styles.extraBottomViewHidden}>
            {extraBottomView}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

export function TabBarWithParams(
  tabs: {
    [name: string]: Tab;
  },
  extraBottomView?: JSX.Element,
  extraBottomViewHiddenForScreenNames?: string[]
) {
  return (props: BottomTabBarProps) => (
    <TabBar
      {...props}
      tabs={tabs}
      extraBottomView={extraBottomView}
      extraBottomViewHiddenForScreenNames={extraBottomViewHiddenForScreenNames}
    />
  );
}

const styles = StyleSheet.create({
  root: {},
  safeAreaHidden: {
    display: 'none',
  },
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
