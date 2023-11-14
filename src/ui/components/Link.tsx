import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useMainColors, useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';

interface Props extends CommonViewProps {
  title?: string;
  icon?: string;
  IconElem?: (props: any) => JSX.Element;
  iconSolid?: boolean;
  iconLeft?: boolean;
  onPress?: () => void;
  secondary?: boolean;
  destructive?: boolean;
  defaultTxtColor?: boolean;
  txtColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  titleStyle?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
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
      {!!props.icon && props.iconLeft === true ? (
        <Icon
          name={props.icon}
          size={16}
          color={
            props.txtColor ||
            (props.defaultTxtColor
              ? theme.txtColor
              : props.destructive
              ? theme.destructiveColor
              : mainColors.txt)
          }
          solid={props.iconSolid === false ? false : true}
          style={[
            styles.icon,
            props.title ? styles.iconRightMargin : undefined,
          ]}
        />
      ) : (
        !!props.IconElem &&
        props.iconLeft === true && (
          <props.IconElem
            width={16}
            height={16}
            style={[
              {
                color:
                  props.txtColor ||
                  (props.defaultTxtColor
                    ? theme.txtColor
                    : props.destructive
                    ? theme.destructiveColor
                    : mainColors.txt),
              },
              props.title ? styles.iconRightMargin : undefined,
            ]}
          />
        )
      )}
      {!!props.title && (
        <Text
          style={[
            styles.title,
            {
              color:
                props.txtColor ||
                (props.defaultTxtColor
                  ? theme.txtColor
                  : props.destructive
                  ? theme.destructiveColor
                  : mainColors.txt),
            },
            props.titleStyle,
          ]}
        >
          {props.title}
        </Text>
      )}
      {props.isLoading ? (
        <ActivityIndicator
          style={[styles.icon, props.title ? styles.iconLeftMargin : undefined]}
          size="small"
          color={theme.txtColor}
        />
      ) : !!props.icon && props.iconLeft !== true ? (
        <Icon
          name={props.icon}
          size={16}
          color={
            props.txtColor ||
            (props.defaultTxtColor
              ? theme.txtColor
              : props.destructive
              ? theme.destructiveColor
              : mainColors.txt)
          }
          solid={props.iconSolid === false ? false : true}
          style={[styles.icon, props.title ? styles.iconLeftMargin : undefined]}
        />
      ) : (
        !!props.IconElem &&
        props.iconLeft !== true && (
          <>
            <Text>test</Text>
            <props.IconElem
              width={16}
              height={16}
              style={[
                {
                  color:
                    props.txtColor ||
                    (props.defaultTxtColor
                      ? theme.txtColor
                      : props.destructive
                      ? theme.destructiveColor
                      : mainColors.txt),
                },
                props.title ? styles.iconLeftMargin : undefined,
              ]}
            />
          </>
        )
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconLeftMargin: {
    marginLeft: 3,
    marginRight: -8,
  },
  iconRightMargin: {
    marginRight: 3,
    marginLeft: -5,
  },
  icon: {
    paddingHorizontal: 4,
  },
});
