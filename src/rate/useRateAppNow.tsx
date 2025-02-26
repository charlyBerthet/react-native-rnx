import Rate from 'react-native-rate';
import { useCallback } from 'react';
import { useHasRatedTheApp } from './useHasRatedTheApp';
import { Linking, Platform } from 'react-native';

export const useRateAppNow = () => {
  const { setHasRatedTheApp } = useHasRatedTheApp();
  const rateAppNow = useCallback(
    (appleAppId: string, googlePackageName?: string) => {
      switch (Platform.OS) {
        case 'ios': {
          Linking.openURL(
            `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${appleAppId}?action=write-review`
          );
          break;
        }
        case 'macos': {
          Linking.openURL(
            `https://apps.apple.com/app/apple-store/id${appleAppId}?action=write-review`
          );
          break;
        }
        default: {
          Rate.rate(
            {
              AppleAppID: appleAppId,
              GooglePackageName: googlePackageName,
              preferInApp: false,
            },
            () => {}
          );
        }
      }
      setTimeout(() => setHasRatedTheApp(true), 10000);
    },
    [setHasRatedTheApp]
  );
  return rateAppNow;
};
