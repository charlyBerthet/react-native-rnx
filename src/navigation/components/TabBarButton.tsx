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
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type NavigationRoute = TabNavigationState<ParamListBase>['routes'][0];

interface Props {
  route: NavigationRoute;
  index: number;
  descriptors: BottomTabDescriptorMap;
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

export function TabBarButton({
  route,
  index,
  descriptors,
  state,
  navigation,
}: Props) {
  const { options } = descriptors[route.key];
  const isFocused = state.index === index;

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
    >
      {options.tabBarIcon}
      {options.tabBarShowLabel !== false && (
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  label: {
    color: '#222',
  },
  labelFocused: {
    color: '#673ab7',
  },
});
