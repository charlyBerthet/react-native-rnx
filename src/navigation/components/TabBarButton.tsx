import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Tab } from '../models/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationRoute = TabNavigationState<ParamListBase>['routes'][0];

interface Props {
  route: NavigationRoute;
  index: number;
  descriptors: BottomTabDescriptorMap;
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  tabs: { [name: string]: Tab };
}

export function TabBarButton({
  route,
  index,
  descriptors,
  state,
  navigation,
  tabs,
}: Props) {
  const { options } = descriptors[route.key];
  const isFocused = state.index === index;
  const color =
    (isFocused
      ? options.tabBarActiveTintColor
      : options.tabBarInactiveTintColor) || '#000';

  const onPress = React.useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  }, [isFocused, navigation, route.key, route.name, route.params]);

  const onLongPress = React.useCallback(() => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  }, [navigation, route.key]);

  if (options.tabBarButton) {
    const Button = options.tabBarButton as () => JSX.Element;
    return <Button />;
  }
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.button}
      activeOpacity={0.8}
    >
      <SafeAreaView edges={['bottom', 'right', 'left']}>
        <View style={styles.contentContainer}>
          {!!tabs[route.name].iconName && (
            <Icon
              name={tabs[route.name].iconName}
              size={21}
              color={color}
              solid={true}
            />
          )}
          {options.tabBarShowLabel !== false && (
            <Text style={[styles.label, { color }]}>
              {options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name}
            </Text>
          )}
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    color: '#222',
  },
});
