import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import type { GestureDirection } from '@react-navigation/stack/lib/typescript/src/types';

export default interface Screen {
  name: string;
  component: React.ComponentType<any>;
  title?: string;
  presentation?: 'modal' | 'transparentModal' | 'card' | undefined;
  headerShown?: boolean;
  gestureDirection?: GestureDirection;
}

export interface Tab {
  screens: Screen[];
  initial: string;
  title?: string;
  iconName: string;
  iconSize?: number;
  customButton?: (props: {
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  }) => JSX.Element;
}
