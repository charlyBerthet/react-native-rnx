import { useGlobalState } from '../store';

export const useHasRatedTheApp = () => {
  const { globalState, setGlobalState } = useGlobalState<{
    hasRatedTheApp: boolean;
  }>();

  const setHasRatedTheApp = (hasRatedTheApp: boolean) => {
    setGlobalState({ hasRatedTheApp });
  };
  return { hasRatedTheApp: globalState.hasRatedTheApp, setHasRatedTheApp };
};
