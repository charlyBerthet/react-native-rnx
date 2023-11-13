import React, { useCallback } from 'react';
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
  iconElement?: JSX.Element;
  isEnabled?: boolean;
  onEnabledChange?: (isEnabled: boolean) => void;
  rightArrow?: boolean;
  minHeight?: number;
  primary?: boolean;
  primaryBg?: boolean;
  rightElem?: JSX.Element;
  ref?: { current?: TouchableOpacity };
}

interface Props extends CommonViewProps, RowModel {
  hasBorderTop?: boolean;
  hasBorderBottom?: boolean;
}

export const Row = (props: Props) => {
  const theme = useTheme();

  const _setRef = useCallback(
    (ref: TouchableOpacity | undefined | null) => {
      if (props.ref) {
        props.ref.current = ref || undefined;
      }
    },
    [props.ref]
  );

  return (
    <View
      style={[
        styles.root,
        props.hasBorderTop && styles.rootBorderTop,
        props.hasBorderBottom && styles.rootBorderBottom,
        props.hasBorderTop && { borderTopColor: theme.borderColor },
        props.hasBorderBottom && { borderBottomColor: theme.borderColor },
        {
          backgroundColor: props.primaryBg ? theme.primaryColor : theme.bgColor,
        },
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
        ref={_setRef}
      >
        {(!!props.icon || !!props.iconElement) && (
          <View style={styles.leftIconContainer}>
            {!!props.icon && (
              <Icon
                name={props.icon}
                size={16}
                color={
                  props.primaryBg
                    ? theme.txtColorOnPrimaryColor
                    : props.primary
                    ? theme.primaryColor
                    : theme.txtColor
                }
                solid={true}
                style={styles.leftIcon}
              />
            )}
            {!!props.iconElement && props.iconElement}
          </View>
        )}

        <View style={styles.txtWrapper}>
          <Text
            style={[
              styles.title,
              {
                color: props.primaryBg
                  ? theme.txtColorOnPrimaryColor
                  : props.primary
                  ? theme.primaryColor
                  : theme.txtColor,
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
                  color: props.primaryBg
                    ? theme.txtColorOnPrimaryColor
                    : props.primary
                    ? theme.primaryColor
                    : theme.txtColor,
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
              trackColor={{
                false: 'gray',
                true: props.primaryBg
                  ? theme.txtColorOnPrimaryColor
                  : theme.primaryColor,
              }}
              thumbColor={props.primaryBg ? theme.primaryColor : 'white'}
              onValueChange={props.onEnabledChange}
              value={props.isEnabled}
              style={styles.switch}
            />
          )}
          {props.rightElem}
          {props.rightArrow && (
            <View style={styles.rightArrow}>
              <Icon
                name="chevron-right"
                size={15}
                color={
                  props.primaryBg
                    ? theme.txtColorOnPrimaryColor
                    : props.primary
                    ? theme.primaryColor
                    : theme.txtColor
                }
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
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  subRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rootBorderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rootBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txtWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
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
  leftIconContainer: {
    marginRight: 15,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    opacity: 0.75,
    minWidth: 20,
  },
  switch: {
    marginLeft: 5,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  rightArrow: {
    marginLeft: 10,
    opacity: 0.6,
  },
});
