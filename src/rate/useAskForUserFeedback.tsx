import { Alert } from 'react-native';
import Rate from 'react-native-rate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useLocalization } from 'react-native-rnx';
import { useHasRatedTheApp } from './useHasRatedTheApp';

export const useAskForUserFeedback = () => {
  const { localize } = useLocalization();
  const { setHasRatedTheApp } = useHasRatedTheApp();
  const askForUserFeedback = useCallback(
    async (
      appleAppId: string,
      forceRate?: boolean,
      googlePackageName?: string
    ): Promise<'accepted' | 'rejected' | 'skipped'> => {
      return new Promise(async (resolve) => {
        const openCount = forceRate
          ? 1
          : parseInt((await AsyncStorage.getItem('openCount')) || '0', 10);

        if (!forceRate) {
          AsyncStorage.setItem('openCount', openCount + 1 + '');
        }

        if (
          openCount === 1 ||
          openCount === 30 ||
          openCount === 90 ||
          openCount === 200 ||
          openCount === 400
        ) {
          setTimeout(
            () => {
              Alert.alert(
                localize('rate.feelingTitle'),
                localize('rate.feelingSubtitle'),
                [
                  {
                    text: localize('global.no'),
                    onPress: () => resolve('rejected'),
                  },
                  {
                    text: localize('global.yes'),
                    onPress: () => {
                      Alert.alert(
                        localize('rate.askRateTitle'),
                        localize('rate.askRateSubtitle'),
                        [
                          {
                            text: localize('global.cancel'),
                            onPress: () => resolve('rejected'),
                          },
                          {
                            text: localize('global.letsgo'),
                            onPress: () => {
                              Rate.rate(
                                {
                                  AppleAppID: appleAppId,
                                  GooglePackageName: googlePackageName,
                                  preferInApp: false,
                                },
                                () => {
                                  setTimeout(
                                    () => setHasRatedTheApp(true),
                                    10000
                                  );
                                  resolve('accepted');
                                }
                              );
                            },
                          },
                        ]
                      );
                    },
                  },
                ]
              );
            },
            forceRate ? 1 : 2000
          );
        } else {
          resolve('skipped');
        }
      });
    },
    [localize, setHasRatedTheApp]
  );
  return askForUserFeedback;
};
