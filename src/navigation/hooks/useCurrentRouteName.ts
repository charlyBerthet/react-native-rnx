import { useEffect, useState } from 'react';
import {
  useNavigation,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

const getCurrentRoute = (
  initialState: NavigationState | PartialState<NavigationState> | undefined
) => {
  const findCurrentRoute = (
    state: NavigationState | PartialState<NavigationState> | undefined
  ): string => {
    if (!state) {
      return '';
    }
    if (state.index === undefined) {
      return '';
    }
    const nextRoute = state?.routes[state.index];
    if (!nextRoute.state) {
      return nextRoute.name;
    }
    return findCurrentRoute(nextRoute.state);
  };
  return findCurrentRoute(initialState);
};

export const useCurrentRouteName = () => {
  const [routeName, setRouteName] = useState<string>();
  const navigation = useNavigation();
  useEffect(() => {
    const sub = navigation.addListener('state', (d) => {
      const route = getCurrentRoute(d.data.state);
      setRouteName(route);
    });
    return () => {
      navigation.removeListener('state', sub);
    };
  }, [navigation]);
  return routeName;
};
