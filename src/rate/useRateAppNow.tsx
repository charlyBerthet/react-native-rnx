import Rate from 'react-native-rate';
import { useCallback } from 'react';
import { useHasRatedTheApp } from './useHasRatedTheApp';

export const useRateAppNow = () => {
  const { setHasRatedTheApp } = useHasRatedTheApp();
  const rateAppNow = useCallback(
    (appleAppId: string, googlePackageName?: string) => {
      Rate.rate(
        {
          AppleAppID: appleAppId,
          GooglePackageName: googlePackageName,
          preferInApp: false,
        },
        () => {
          setHasRatedTheApp(true);
        }
      );
    },
    [setHasRatedTheApp]
  );
  return rateAppNow;
};
