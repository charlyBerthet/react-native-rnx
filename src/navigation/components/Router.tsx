import * as React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Stack } from './Stack';
import { TabNavigator, TabModel } from './TabNavigator';
import useTheme from '../../theme/hooks/useTheme';

interface Props {
  tabs: {
    [name: string]: TabModel;
  };
}

export const Router = (props: Props) => {
  const theme = useTheme();
  const isDarkTheme = useColorScheme() === 'dark';

  const tabs = Object.keys(props.tabs).map((name) => ({
    name,
    ...props.tabs[name],
  }));

  return (
    <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
      <NavigationContainer
        theme={{
          dark: isDarkTheme,
          colors: {
            primary: theme.primaryColor,
            background: theme.bgColor,
            card: theme.bgColor,
            text: theme.txtColor,
            border: theme.bgColor,
            notification: theme.txtColor,
          },
        }}
      >
        {tabs.length > 1 ? ( // Multiple tabs, show bottom bar
          <TabNavigator tabs={props.tabs} />
        ) : tabs.length === 1 ? ( // One tab, don't show bottom bar
          <Stack screens={tabs[0].screens} initial={tabs[0].initial} />
        ) : undefined}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
