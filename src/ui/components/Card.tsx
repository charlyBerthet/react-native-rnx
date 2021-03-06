import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useMainColors, useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';
import type { CardModel } from '../models/CardModel';

interface Props extends CommonViewProps, CardModel {}

export const Card = (props: Props) => {
  const theme = useTheme();
  const mainColors = useMainColors(props.secondaryColor);
  return (
    <TouchableOpacity
      onPress={props.onPrimaryButtonPress}
      onLongPress={props.onLongPress}
      style={[
        styles.root,
        {
          backgroundColor: mainColors.bg,
        },
        props.style,
      ]}
      activeOpacity={0.9}
    >
      <View style={styles.mainContainer}>
        <Text style={[styles.title, { color: theme.txtColorOnPrimaryColor }]}>
          {props.title}
        </Text>
        <Text style={[styles.detail, { color: theme.txtColorOnPrimaryColor }]}>
          {props.detail}
        </Text>
        <Text
          style={[styles.subdetail, { color: theme.txtColorOnPrimaryColor }]}
        >
          {props.subdetail}
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity
            onPress={props.onPrimaryButtonPress}
            style={[
              styles.btn,
              { backgroundColor: theme.txtColorOnPrimaryColor },
            ]}
          >
            <Text style={[styles.btnLabel, { color: mainColors.bg }]}>
              {props.primaryButtonLabel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onSecondaryButtonPress}
            style={[styles.btn, styles.btnRight]}
          >
            <Text
              style={[styles.btnLabel, { color: theme.txtColorOnPrimaryColor }]}
            >
              {props.secondaryButtonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={props.image} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
  },
  subdetail: {
    fontSize: 10,
    fontWeight: '700',
    opacity: 0.7,
    marginVertical: 8,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: -3,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  btnRight: {
    paddingRight: 5,
  },
  btnLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  image: {
    width: 85,
    height: 85,
    marginLeft: 10,
    marginRight: -5,
  },
});
