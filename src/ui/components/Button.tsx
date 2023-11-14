import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { useTheme, useMainColors } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title?: string;
  icon?: string;
  subtitle?: string;
  onPress?: () => void;
  full?: boolean;
  disabled?: boolean;
  rightArrow?: boolean;
  important?: boolean;
  type?: 'outline' | 'normal';
  small?: boolean;
  secondary?: boolean;
  isLoading?: boolean;
  noElevation?: boolean;
  iconSize?: number;
  bgColor?: string;
  titleFontSize?: number;
  rightElem?: JSX.Element;
  disabledDoNotChangeOpacity?: boolean;
  activeOpacity?: number;
}

export const Button = (props: Props) => {
  const theme = useTheme();
  const mainColors = useMainColors(props.secondary);
  const btnType = props.type || 'normal';
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      activeOpacity={props.activeOpacity}
      style={[
        styles.container,
        props.full && styles.containerFull,
        props.disabled &&
          !props.disabledDoNotChangeOpacity &&
          styles.containerDisabled,
        btnType === 'normal' && { backgroundColor: mainColors.bg },
        btnType === 'outline' && { borderColor: mainColors.bg },
        btnType === 'outline' && styles.containerOutline,
        props.small && styles.containerSmall,
        props.noElevation && styles.containerNoElevation,
        props.style,
        !!props.bgColor && { backgroundColor: props.bgColor },
      ]}
    >
      {!!props.icon && (
        <Icon
          name={props.icon}
          size={props.iconSize || 18}
          color={
            btnType === 'normal' ? theme.txtColorOnPrimaryColor : mainColors.txt
          }
          solid={true}
          style={!!props.icon && styles.iconWithTitle}
        />
      )}
      <View style={styles.titleWrapper}>
        {!!props.title && (
          <Text
            style={[
              styles.title,
              props.small && styles.titleSmall,
              props.important && styles.titleImportant,
              {
                color:
                  btnType === 'normal'
                    ? theme.txtColorOnPrimaryColor
                    : mainColors.txt,
              },
              !!props.titleFontSize && { fontSize: props.titleFontSize },
            ]}
          >
            {props.title}
          </Text>
        )}
        {props.subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color:
                  btnType === 'normal'
                    ? theme.txtColorOnPrimaryColor
                    : mainColors.txt,
              },
            ]}
          >
            {props.subtitle}
          </Text>
        )}
      </View>
      {props.rightElem}
      {props.rightArrow && (
        <View style={styles.rightArrow}>
          <Icon
            name="chevron-right"
            size={18}
            color={
              btnType === 'normal'
                ? theme.txtColorOnPrimaryColor
                : mainColors.txt
            }
            solid={true}
          />
        </View>
      )}
      {props.isLoading && (
        <View style={styles.rightArrow}>
          <ActivityIndicator
            color={
              btnType === 'normal'
                ? theme.txtColorOnPrimaryColor
                : mainColors.txt
            }
            size="small"
          />
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerNoElevation: {
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
    opacity: 0.5,
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
    right: 14,
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
  iconWithTitle: {
    marginRight: 10,
  },
  titleWrapper: {},
});
