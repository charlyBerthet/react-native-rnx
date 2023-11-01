import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  NativeEventSubscription,
} from 'react-native';
import { setActionsSheetRef } from '../hooks/useBottomSheet';
import {
  BottomSheetOptionsProps,
  BottomSheetOptions,
} from './BottomSheetOptions';
import RNBottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '../../theme';

export interface BottomSheetActionsRef {
  showOptions: (props: BottomSheetOptionsProps) => void;
  show: (props: BottomSheetProps) => void;
  hide: () => void;
}

export interface BottomSheetProps {
  element?: JSX.Element;
  onHide?: () => void;
  snapPoints?: (string | number)[];
  disableScrollToClose?: boolean;
  hideHandle?: boolean;
  disableInternalScrollView?: boolean;
}

export const BottomSheet = () => {
  const snapPoints = useMemo(() => ['90%'], []);
  const [isVisible, setIsVisible] = useState(false);
  const [
    sheetOptionsProps,
    setSheetOptionsProps,
  ] = useState<BottomSheetOptionsProps>();
  const [sheetProps, setSheetProps] = useState<BottomSheetProps>();
  const hideRef = useRef<() => void>();
  const disableInternalScrollView =
    sheetProps?.disableInternalScrollView ||
    sheetOptionsProps?.disableInternalScrollView;
  const disableScrollToClose =
    sheetProps?.disableScrollToClose || sheetOptionsProps?.disableScrollToClose;
  const hideHandle = sheetProps?.hideHandle || sheetOptionsProps?.hideHandle;
  const theme = useTheme();

  const showOptions = useCallback((props: BottomSheetOptionsProps) => {
    setSheetOptionsProps(props);
    setIsVisible(true);
  }, []);

  const show = useCallback((props: BottomSheetProps) => {
    setSheetProps(props);
    setIsVisible(true);
  }, []);

  const onHidden = useCallback(() => {
    console.log('[RNX][BOTTOM_SHEET] onHidden');
    if (sheetProps && sheetProps.onHide) {
      sheetProps.onHide();
    }
    setSheetProps(undefined);
    setSheetOptionsProps(undefined);
    setIsVisible(false);
  }, [sheetProps]);

  const hide = useCallback(() => {
    console.log('[RNX][BOTTOM_SHEET] hide');
    if (hideRef.current) {
      hideRef.current();
    } else {
      console.log('[RNX][BOTTOM_SHEET] hide abort, missing hideRef');
    }
  }, []);

  // Handle back button
  const backHandlerRef = useRef<NativeEventSubscription>();
  useEffect(() => {
    if (backHandlerRef.current) {
      backHandlerRef.current.remove();
    }
    if (isVisible) {
      backHandlerRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // if disableScrollToClose is true then we lock user on screen
          if (!disableScrollToClose) {
            hide();
          }
          return true;
        }
      );
    }
  }, [isVisible, hide, disableScrollToClose]);

  return (
    <>
      {isVisible && (
        <TouchableOpacity
          onPress={isVisible && !disableScrollToClose ? hide : undefined}
          style={[
            styles.backdrop,
            {
              backgroundColor: theme.txtColor,
            },
          ]}
          activeOpacity={0.65}
        />
      )}

      <RNBottomSheet
        backgroundStyle={
          sheetOptionsProps
            ? styles.sheetOptionsBgStyle
            : {
                backgroundColor: theme.bgColor,
              }
        }
        handleStyle={
          sheetOptionsProps || disableScrollToClose || hideHandle
            ? styles.sheetOptionsHandleStyle
            : undefined
        }
        ref={(ref) => {
          if (ref) {
            hideRef.current = ref.close;
            setActionsSheetRef({
              show: (props) => {
                console.log(
                  '[RNX][BOTTOM_SHEET] show element:',
                  !!props.element,
                  'hideHandle',
                  props.hideHandle,
                  'snapPoints',
                  props.snapPoints,
                  'disableInternalScrollView',
                  props.disableInternalScrollView,
                  'disableScrollToClose',
                  props.disableScrollToClose
                );
                ref.expand();
                show(props);
              },
              showOptions: (props) => {
                console.log('[RNX][BOTTOM_SHEET] showOptions');
                ref.expand();
                showOptions(props);
              },
              hide: () => {
                console.log('[RNX][BOTTOM_SHEET] actionsSheetRef call hide');
                hide();
              },
            });
          }
        }}
        index={-1}
        snapPoints={
          sheetProps?.snapPoints || sheetOptionsProps?.snapPoints || snapPoints
        }
        onClose={onHidden}
        enablePanDownToClose={disableScrollToClose ? false : true}
        enableContentPanningGesture={disableScrollToClose ? false : true}
        enableHandlePanningGesture={disableScrollToClose ? false : true}
      >
        {disableInternalScrollView ? (
          <>
            {sheetOptionsProps && <BottomSheetOptions {...sheetOptionsProps} />}
            {sheetProps?.element ? sheetProps.element : undefined}
          </>
        ) : (
          <BottomSheetScrollView>
            <>
              {sheetOptionsProps && (
                <BottomSheetOptions {...sheetOptionsProps} />
              )}
              {sheetProps?.element ? sheetProps.element : undefined}
            </>
          </BottomSheetScrollView>
        )}
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
    opacity: 0.7,
  },
  sheetOptionsBgStyle: {
    backgroundColor: 'transparent',
  },
  sheetOptionsHandleStyle: {
    display: 'none',
  },
});
