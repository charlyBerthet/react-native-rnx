import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export const useShouldAskForUserFeedback = () => {
  const shouldAskForUserFeedback = useCallback(async () => {
    const openCount = parseInt(
      (await AsyncStorage.getItem('openCount')) || '0',
      10
    );
    return (
      openCount === 1 ||
      openCount === 30 ||
      openCount === 90 ||
      openCount === 200 ||
      openCount === 400
    );
  }, []);
  return shouldAskForUserFeedback;
};
