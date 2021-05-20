import { Alert } from 'react-native';
import Rate from 'react-native-rate';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const askForUserFeedback = async (
  appleAppId: string,
  translate: (key: string) => string
) => {
  const openCount = parseInt(
    (await AsyncStorage.getItem('openCount')) || '0',
    10
  );
  AsyncStorage.setItem('openCount', openCount + 1 + '');

  if (
    openCount === 1 ||
    openCount === 30 ||
    openCount === 90 ||
    openCount === 200 ||
    openCount === 400
  ) {
    setTimeout(() => {
      Alert.alert(
        translate('rate.feelingTitle'),
        translate('rate.feelingSubtitle'),
        [
          {
            text: translate('global.no'),
          },
          {
            text: translate('global.yes'),
            onPress: () => {
              Alert.alert(
                translate('rate.askRateTitle'),
                translate('rate.askRateSubtitle'),
                [
                  {
                    text: translate('global.cancel'),
                  },
                  {
                    text: translate('global.letsgo'),
                    onPress: () => {
                      Rate.rate(
                        {
                          AppleAppID: appleAppId,
                          preferInApp: false,
                        },
                        () => {
                          /* no opt */
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
    }, 2000);
  }
};
