import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useMainColors, useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title?: string;
  icon?: string;
  onPress?: () => void;
  secondary?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
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
        <ActivityIndicator size="small" color={theme.txtColor} />
      ) : (
        !!props.icon && (
          <Icon
            name={props.icon}
            size={18}
            color={props.destructive ? theme.destructiveColor : mainColors.txt}
            solid={true}
            style={styles.icon}
          />
        )
      )}
      {!!props.title && (
        <Text
          style={[
            styles.title,
            {
              color: props.destructive
                ? theme.destructiveColor
                : mainColors.txt,
            },
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
