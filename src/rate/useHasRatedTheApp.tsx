import { useCallback } from 'react';
import { useGlobalState } from '../store';

export const useHasRatedTheApp = () => {
  const { globalState, setGlobalState } = useGlobalState<
    {
      hasRatedTheApp: boolean;
    },
    string
  >();

  const setHasRatedTheApp = useCallback(
    (hasRatedTheApp: boolean) => {
      setGlobalState({ hasRatedTheApp });
    },
    [setGlobalState]
  );

  return { hasRatedTheApp: globalState.hasRatedTheApp, setHasRatedTheApp };
};
