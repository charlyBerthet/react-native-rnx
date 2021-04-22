import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import type CommonViewProps from '../models/CommonViewProps';

export interface BottomSheetOptionsActionsRef {
  show: () => void;
  hide: () => void;
}

interface Props extends CommonViewProps {
  actionsref: (actionsRef: BottomSheetOptionsActionsRef) => void;
}

export const BottomSheetOptions = (props: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const { actionsref } = props;

  const show = useCallback(() => {
    sheetRef?.current?.snapTo(450);
  }, []);

  const hide = useCallback(() => {
    sheetRef?.current?.snapTo(0);
  }, []);

  useEffect(() => {
    actionsref({ show, hide });
  }, [actionsref, hide, show]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[450, 300, 0]}
      initialSnap={450}
      borderRadius={10}
      renderContent={() => (
        <View style={[styles.root, props.style]}>
          <Text>TEST</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
});
