import 'react';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useLocalization } from 'react-native-rnx';
import { useUpgrade } from './useUpgrade';
import { useIsPremium } from './useIsPremium';

export const usePremiumGuard = () => {
  const { isPremium } = useIsPremium();
  const upgrade = useUpgrade();
  const { localize } = useLocalization();

  const continueIfPremium = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (isPremium) {
        return resolve();
      }
      Alert.alert(localize('iap.guardTitle'), localize('iap.guardMessage'), [
        {
          text: localize('global.learnmore'),
          style: 'default',
          onPress: () => {
            upgrade();
            return reject();
          },
        },
        {
          text: localize('global.cancel'),
          style: 'cancel',
          onPress: () => {
            return reject();
          },
        },
      ]);
    });
  }, [isPremium, localize, upgrade]);

  return { continueIfPremium };
};
