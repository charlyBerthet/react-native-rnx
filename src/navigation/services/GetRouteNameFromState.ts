import type { NavigationState, PartialState } from '@react-navigation/native';

export const getRouteNameFromState = (
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
