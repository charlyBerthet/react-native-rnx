import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { setActionsSheetRef } from '../hooks/useBottomSheet';
import {
  BottomSheetOptions,
  BottomSheetOptionsProps,
} from './BottomSheetOptions';
import RNBottomSheet from '@gorhom/bottom-sheet';

export interface BottomSheetActionsRef {
  showOptions: (props?: BottomSheetOptionsProps) => void;
  show: (props?: BottomSheetProps) => void;
  hide: () => void;
}

export interface BottomSheetProps {
  element: () => JSX.Element;
  onHide?: () => void;
}

export const BottomSheet = () => {
  const snapPoints = useMemo(() => ['75%'], []);
  const [isVisible, setIsVisible] = useState(false);
  const [
    sheetOptionsProps,
    setSheetOptionsProps,
  ] = useState<BottomSheetOptionsProps>();
  const [sheetProps, setSheetProps] = useState<BottomSheetProps>();
  const hideRef = useRef<() => void>();

  const showOptions = (props?: BottomSheetOptionsProps) => {
    setSheetOptionsProps(props);
    setIsVisible(true);
  };

  const show = (props?: BottomSheetProps) => {
    setSheetProps(props);
    setIsVisible(true);
  };

  const hide = () => {
    if (hideRef.current) {
      hideRef.current();
    }
    onHidden();
  };

  const onHidden = () => {
    if (sheetProps && sheetProps.onHide) {
      sheetProps.onHide();
    }
    setSheetProps(undefined);
    setSheetOptionsProps(undefined);
    setIsVisible(false);
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      {isVisible && (
        <TouchableOpacity
          onPress={isVisible ? hide : undefined}
          style={styles.backdrop}
          activeOpacity={0.65}
        />
      )}

      <RNBottomSheet
        ref={(ref) => {
          if (ref) {
            hideRef.current = ref.close;
            setActionsSheetRef({
              show: () => {
                ref.expand();
                show();
              },
              showOptions: () => {
                ref.expand();
                showOptions();
              },
              hide: () => {
                hide();
              },
            });
          }
        }}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={onHidden}
        enablePanDownToClose
      >
        <>
          {sheetOptionsProps && <BottomSheetOptions {...sheetOptionsProps} />}
          {sheetProps?.element ? <sheetProps.element /> : undefined}
        </>
      </RNBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.7,
  },
});
