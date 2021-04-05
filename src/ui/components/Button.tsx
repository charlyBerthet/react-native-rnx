import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  full?: boolean;
  disabled?: boolean;
  rightArrow?: boolean;
  important?: boolean;
}

export const Button = (props: Props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        styles.container,
        props.full && styles.containerFull,
        props.disabled && styles.containerDisabled,
        { backgroundColor: theme.primaryColor },
        props.style,
      ]}
    >
      <Text
        style={[
          styles.title,
          props.important && styles.titleImportant,
          { color: theme.txtColorOnPrimaryColor },
        ]}
      >
        {props.title}
      </Text>
      {props.rightArrow && (
        <View style={styles.rightArrow}>
          <Text>{'>'}</Text>
        </View>
      )}
      {props.subtitle && (
        <Text
          style={[styles.subtitle, { color: theme.txtColorOnPrimaryColor }]}
        >
          {props.subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 7,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerDisabled: {
    opacity: 0.7,
  },
  containerFull: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleImportant: {
    fontSize: 18,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});
