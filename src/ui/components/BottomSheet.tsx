import React, { useRef, useState } from 'react';
import RNBottomSheet from 'reanimated-bottom-sheet';
import { View } from 'react-native';
import { setActionsSheetRef } from '../hooks/useBottomSheet';
import { BottomSheetOptions } from './BottomSheetOptions';

export interface BottomSheetActionsRef {
  show: (props?: any) => void;
  hide: () => void;
}

const snapPointHeight = 300;

export const BottomSheet = () => {
  const snapPoints = [snapPointHeight, 0];
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
      borderRadius={17}
      enabledInnerScrolling={false}
      enabledContentTapInteraction={false}
      renderHeader={() => (
        <View style={{ height: 500, backgroundColor: '#000', opacity: 0.7 }} />
      )}
      renderContent={() =>
        sheetProps && (
          <BottomSheetOptions {...sheetProps} height={snapPoints[0]} />
        )
      }
    />
  );
};
