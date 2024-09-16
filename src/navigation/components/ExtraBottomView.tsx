import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children?: JSX.Element;
  hiddenForScreenNames?: string[];
}

export function ExtraBottomView({ children }: Props) {
  const { bottom: safeAreaBottomInset } = useSafeAreaInsets();

  if (!children) {
    return null;
  }
  return (
    <View
      style={[
        styles.root,
        {
          marginTop: -safeAreaBottomInset,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
});
