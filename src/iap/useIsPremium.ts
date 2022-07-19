import { useCallback } from 'react';
import { useGlobalState } from '../store';

export const useIsPremium = () => {
  const { globalState, setGlobalState } = useGlobalState<{
    isPremium: boolean;
  }>();

  const setIsPremium = useCallback(
    (isPremium: boolean) => {
      setGlobalState({ isPremium });
    },
    [setGlobalState]
  );

  return { isPremium: globalState.isPremium, setIsPremium };
};
