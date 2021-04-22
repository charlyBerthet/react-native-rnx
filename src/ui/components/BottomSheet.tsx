import React, { useRef, useState } from 'react';
import RNBottomSheet from 'reanimated-bottom-sheet';
import { setActionsSheetRef } from '../hooks/useBottomSheet';
import { BottomSheetOptions } from './BottomSheetOptions';

export interface BottomSheetActionsRef {
  show: (props?: any) => void;
  hide: () => void;
}

export const BottomSheet = () => {
  const snapPoints = [450, 0];
  const [sheetProps, setSheetProps] = useState<any>();
  const sheetRef = useRef<RNBottomSheet | undefined>();

  const show = (props?: any) => {
    setSheetProps(props);
    sheetRef.current?.snapTo(0);
  };

  const hide = () => {
    setSheetProps(undefined);
    sheetRef.current?.snapTo(snapPoints[snapPoints.length - 1]);
  };

  return (
    <RNBottomSheet
      ref={(ref) => {
        sheetRef.current = ref || undefined;
        setActionsSheetRef({
          show,
          hide,
        });
      }}
      snapPoints={snapPoints}
      initialSnap={snapPoints[snapPoints.length - 1]}
      borderRadius={10}
      renderContent={() => <BottomSheetOptions {...sheetProps} />}
    />
  );
};
