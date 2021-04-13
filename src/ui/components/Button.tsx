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
  type?: 'outline' | 'normal';
  small?: boolean;
  color?: string;
}

export const Button = (props: Props) => {
  const theme = useTheme();
  const bgColor = props.color || theme.primaryColor;
  const txtColor = props.color || theme.primaryTxtColor;
  const btnType = props.type || 'normal';
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        styles.container,
        props.full && styles.containerFull,
        props.disabled && styles.containerDisabled,
        btnType === 'normal' && { backgroundColor: bgColor },
        btnType === 'outline' && { borderColor: bgColor },
        btnType === 'outline' && styles.containerOutline,
        props.small && styles.containerSmall,
        props.style,
      ]}
    >
      <Text
        style={[
          styles.title,
          props.small && styles.titleSmall,
          props.important && styles.titleImportant,
          {
            color:
              btnType === 'normal' ? theme.txtColorOnPrimaryColor : txtColor,
          },
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
          style={[
            styles.subtitle,
            {
              color:
                btnType === 'normal' ? theme.txtColorOnPrimaryColor : txtColor,
            },
          ]}
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
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    minWidth: 250,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerOutline: {
    borderWidth: 1,
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  containerSmall: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: 0,
  },
  containerDisabled: {
    opacity: 0.7,
  },
  containerFull: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: '500',
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
    marginBottom: -2,
  },
});
