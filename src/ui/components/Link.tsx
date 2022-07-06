import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useMainColors, useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title?: string;
  icon?: string;
  iconSolid?: boolean;
  onPress?: () => void;
  secondary?: boolean;
  destructive?: boolean;
  defaultTxtColor?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  titleStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
}

export const Link = (props: Props) => {
  const mainColors = useMainColors(props.secondary);
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.disabled && styles.disabled, props.style]}
      disabled={props.disabled}
    >
      {props.isLoading ? (
        <ActivityIndicator
          style={styles.icon}
          size="small"
          color={theme.txtColor}
        />
      ) : (
        !!props.icon && (
          <Icon
            name={props.icon}
            size={16}
            color={
              props.defaultTxtColor
                ? theme.txtColor
                : props.destructive
                ? theme.destructiveColor
                : mainColors.txt
            }
            solid={props.iconSolid === false ? false : true}
            style={styles.icon}
          />
        )
      )}
      {!!props.title && (
        <Text
          style={[
            styles.title,
            {
              color: props.defaultTxtColor
                ? theme.txtColor
                : props.destructive
                ? theme.destructiveColor
                : mainColors.txt,
            },
            props.titleStyle,
          ]}
        >
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    paddingHorizontal: 4,
  },
});
