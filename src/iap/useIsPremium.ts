import { useGlobalState } from '../store';

const useIsPremium = () => {
  const { globalState, setGlobalState } = useGlobalState<{
    isPremium: boolean;
  }>();

  const setIsPremium = (isPremium: boolean) => {
    setGlobalState({ isPremium });
  };
  return { isPremium: globalState.isPremium, setIsPremium };
};

export default useIsPremium;
