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
    return new Promise<void>((resolve) => {
      if (isPremium) {
        return resolve();
      }
      Alert.alert(localize('iap.guardTitle'), localize('iap.guardMessage'), [
        {
          text: localize('global.upgrade'),
          style: 'default',
          onPress: () => {
            upgrade();
          },
        },
        {
          text: localize('global.cancel'),
          style: 'cancel',
        },
      ]);
    });
  }, [isPremium, localize, upgrade]);

  return { continueIfPremium };
};
