import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface RowModel {
  title: string;
  subtitle?: string;
  rightLabel?: string;
  rightLabelCaption?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  icon?: string;
  isEnabled?: boolean;
  onEnabledChange?: (isEnabled: boolean) => void;
  rightArrow?: boolean;
  minHeight?: number;
  primary?: boolean;
}

interface Props extends CommonViewProps, RowModel {
  hasBorderTop?: boolean;
  hasBorderBottom?: boolean;
}

export const Row = (props: Props) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.root,
        props.hasBorderTop && styles.rootBorderTop,
        props.hasBorderBottom && styles.rootBorderBottom,
        props.hasBorderTop && { borderTopColor: theme.borderColor },
        props.hasBorderBottom && { borderBottomColor: theme.borderColor },
        { backgroundColor: theme.bgColor },
        props.style,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.subRoot,
          {
            minHeight: props.minHeight,
          },
        ]}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        activeOpacity={props.onPress ? 0.8 : 1}
      >
        {!!props.icon && (
          <Icon
            name={props.icon}
            size={16}
            color={props.primary ? theme.primaryColor : theme.txtColor}
            solid={true}
            style={styles.leftIcon}
          />
        )}
        <View style={styles.txtWrapper}>
          <Text
            style={[
              styles.title,
              {
                color: props.primary ? theme.primaryColor : theme.txtColor,
              },
            ]}
          >
            {props.title}
          </Text>
          {!!props.subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: props.primary ? theme.primaryColor : theme.txtColor,
                },
              ]}
            >
              {props.subtitle}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <View>
            {!!props.rightLabel && (
              <Text style={styles.rightLabel}>{props.rightLabel}</Text>
            )}
            {!!props.rightLabelCaption && (
              <Text
                style={[
                  styles.rightLabelCaption,
                  !props.rightLabel && styles.rightLabelCaptionAlone,
                ]}
              >
                {props.rightLabelCaption}
              </Text>
            )}
          </View>
          {props.isEnabled !== undefined && (
            <Switch
              trackColor={{ false: 'gray', true: theme.primaryColor }}
              thumbColor={'white'}
              onValueChange={props.onEnabledChange}
              value={props.isEnabled}
              style={styles.switch}
            />
          )}
          {props.rightArrow && (
            <View style={styles.rightArrow}>
              <Icon
                name="chevron-right"
                size={15}
                color={props.primary ? theme.primaryColor : theme.txtColor}
                solid={true}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  subRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rootBorderTop: {
    borderTopWidth: 0.5,
  },
  rootBorderBottom: {
    borderBottomWidth: 0.5,
  },
  txtWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '700',
  },
  rightLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightLabelCaption: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.75,
  },
  rightLabelCaptionAlone: {
    marginTop: 0,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    opacity: 0.75,
    marginRight: 15,
    marginLeft: 5,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    marginLeft: 5,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  rightArrow: {
    marginLeft: 10,
    opacity: 0.75,
  },
});
