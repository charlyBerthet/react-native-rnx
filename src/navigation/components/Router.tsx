import * as React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';

import { Stack } from './Stack';
import useTheme from '../../theme/hooks/useTheme';
import { BottomSheet } from '../../ui/components/BottomSheet';
import { Tab } from '../models/Screen';
import { TabNavigator } from './TabNavigator';

interface Props {
  hideTabLabels?: boolean;
  extraBottomView?: JSX.Element;
  extraBottomViewHiddenForScreenNames?: string[];
  tabs: {
    [name: string]: Tab;
  };
}

export const Router = (props: Props) => {
  const theme = useTheme();
  const isDarkTheme = useColorScheme() === 'dark';

  const tabsCount = React.useMemo(() => {
    return Object.keys(props.tabs).length;
  }, [props.tabs]);

  const firstTab = React.useMemo<Tab | undefined>(() => {
    for (const key of Object.keys(props.tabs)) {
      return props.tabs[key];
    }
    return;
  }, [props.tabs]);

  const navigationContainerTheme = React.useMemo<Theme>(
    () => ({
      dark: isDarkTheme,
      colors: {
        primary: theme.primaryColor,
        background: theme.bgColor,
        card: theme.bgColor,
        text: theme.txtColor,
        border: theme.bgColor,
        notification: theme.txtColor,
      },
    }),
    [isDarkTheme, theme.bgColor, theme.primaryColor, theme.txtColor]
  );

  return React.useMemo(() => {
    console.log('[RNX][RENDER] Router');
    return (
      <>
        <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
          <NavigationContainer theme={navigationContainerTheme}>
            {tabsCount > 1 ? ( // Multiple tabs: show bottom bar
              <TabNavigator
                tabs={props.tabs}
                hideTabLabels={props.hideTabLabels}
                extraBottomView={props.extraBottomView}
                extraBottomViewHiddenForScreenNames={
                  props.extraBottomViewHiddenForScreenNames
                }
              />
            ) : tabsCount === 1 && firstTab ? ( // One tab: don't show bottom bar
              <Stack screens={firstTab.screens} initial={firstTab.initial} />
            ) : undefined}
          </NavigationContainer>
        </View>
        <BottomSheet />
      </>
    );
  }, [
    props.extraBottomViewHiddenForScreenNames,
    props.extraBottomView,
    theme.bgColor,
    navigationContainerTheme,
    tabsCount,
    props.tabs,
    props.hideTabLabels,
    firstTab,
  ]);
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
