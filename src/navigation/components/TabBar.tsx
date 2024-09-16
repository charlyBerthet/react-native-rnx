import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarButton } from './TabBarButton';
import { Tab } from '../models/Screen';

interface Props extends BottomTabBarProps {}

export function TabBar(tabs: { [name: string]: Tab }) {
  return function ({ state, descriptors, navigation }: Props) {
    return (
      <View style={styles.root}>
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
    );
  };
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
});
