import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarButton } from './TabBarButton';
import { Tab } from '../models/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends BottomTabBarProps {}

export function TabBar(tabs: { [name: string]: Tab }) {
  return function ({ state, descriptors, navigation }: Props) {
    console.log('TEST', navigation.getState().routes);
    console.log('TEST', navigation.getState().index);
    console.log(
      'TEST',
      navigation.getState().routes[navigation.getState().index].name
    );
    return (
      <View style={styles.root}>
        <SafeAreaView edges={['bottom', 'right', 'left']}>
          <View style={styles.contentContainer}>
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
        </SafeAreaView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  root: {},
  contentContainer: {
    flexDirection: 'row',
  },
});
