import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import 'react-native-reanimated';
import RNBottomSheet from 'reanimated-bottom-sheet';
import { setSheetRef } from '../hooks/useBottomSheet';

export const BottomSheet = () => {
  return (
    <RNBottomSheet
      ref={setSheetRef}
      snapPoints={[450, 300, 0]}
      borderRadius={10}
      onOpenStart={() => console.log('onOpen')}
      onCloseEnd={() => console.log('onOpen')}
      renderContent={() => (
        <View style={[styles.root]}>
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
    height: 450,
    backgroundColor: 'red',
  },
});
