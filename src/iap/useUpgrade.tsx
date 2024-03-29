import React from 'react';
import { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useBottomSheet } from 'react-native-rnx';
import { UpgradeViewSheet } from './UpgradeView';

export const useUpgrade = () => {
  const sheet = useBottomSheet();

  const upgrade = useCallback(() => {
    const height = Dimensions.get('window').height - 50;
    sheet.show({
      snapPoints: [height],
      hideHandle: true,
      element: <UpgradeViewSheet />,
    });
  }, [sheet]);

  return upgrade;
};
