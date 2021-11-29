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
            color={theme.txtColor}
            solid={true}
            style={styles.leftIcon}
          />
        )}
        <View style={styles.txtWrapper}>
          <Text style={styles.title}>{props.title}</Text>
          {!!props.subtitle && (
            <Text style={styles.subtitle}>{props.subtitle}</Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <View>
            {!!props.rightLabel && (
              <Text style={styles.rightLabel}>{props.rightLabel}</Text>
            )}
            {!!props.rightLabelCaption && (
              <Text style={styles.rightLabelCaption}>
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
                color={theme.txtColor}
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
    fontSize: 10,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  leftIcon: {
    opacity: 0.75,
    marginRight: 15,
    marginLeft: 5,
  },
  switch: {
    marginLeft: 10,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  rightArrow: {
    marginLeft: 10,
    opacity: 0.75,
  },
});
