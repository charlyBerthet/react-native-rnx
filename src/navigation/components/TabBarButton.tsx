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
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { Tab } from '../models/Screen';
import { useTheme } from 'react-native-rnx';

type NavigationRoute = TabNavigationState<ParamListBase>['routes'][0];

interface Props {
  route: NavigationRoute;
  index: number;
  descriptors: BottomTabDescriptorMap;
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  tabs: { [name: string]: Tab };
  Icon?: (props: {
    style: StyleProp<TextStyle>;
    width: number;
    height: number;
  }) => JSX.Element;
  IconActive?: (props: {
    style: StyleProp<TextStyle>;
    width: number;
    height: number;
  }) => JSX.Element;
  iconSize?: number;
}

export function TabBarButton({
  route,
  index,
  descriptors,
  state,
  navigation,
  tabs,
  Icon,
  IconActive,
  iconSize,
}: Props) {
  const theme = useTheme();
  const { options } = descriptors[route.key];
  const isFocused = state.index === index;
  const color = (isFocused ? theme.txtColor : 'gray') || '#000';

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

  const _iconSize = iconSize || 21;

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
      {!!tabs[route.name].iconName && (
        <FAIcon
          name={tabs[route.name].iconName}
          size={_iconSize}
          color={color}
          solid={true}
        />
      )}
      {!!Icon &&
        (isFocused && IconActive ? (
          <IconActive
            width={_iconSize}
            height={_iconSize}
            style={[{ color: theme.txtColor }]}
          />
        ) : (
          <Icon
            width={_iconSize}
            height={_iconSize}
            style={[{ color: theme.txtColor }]}
          />
        ))}
      {options.tabBarShowLabel !== false && (
        <Text style={[styles.label, { color }]}>
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    color: '#222',
  },
});
