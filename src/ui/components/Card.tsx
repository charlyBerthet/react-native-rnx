import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useMainColors, useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';
import type { CardModel } from '../models/CardModel';
import { useIsPremium } from 'react-native-rnx';

interface Props extends CommonViewProps, CardModel {}

export const Card = (props: Props) => {
  const theme = useTheme();
  const mainColors = useMainColors(props.secondaryColor);
  const { isPremium } = useIsPremium();
  return (
    <TouchableOpacity
      onPress={props.onSecondaryButtonPress}
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
        <Text style={[styles.title, { color: theme.txtColor }]}>
          {props.title}
        </Text>
        <Text style={[styles.detail, { color: theme.txtColor }]}>
          {props.detail}
        </Text>
        <Text style={[styles.subdetail, { color: theme.txtColor }]}>
          {props.subdetail}
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity
            onPress={props.onPrimaryButtonPress}
            style={[styles.btn, { backgroundColor: theme.primaryColor }]}
          >
            <Text
              style={[styles.btnLabel, { color: theme.txtColorOnPrimaryColor }]}
            >
              {props.primaryButtonLabel}
            </Text>
            {props.isPremiumRequired && !isPremium && (
              <Image
                source={require('@assets/images/premium-gold.png')}
                style={styles.premiumIcon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onSecondaryButtonPress}
            style={[styles.btn, styles.btnRight]}
          >
            <Text style={[styles.btnLabel, { color: theme.primaryTxtColor }]}>
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
  premiumIcon: {
    position: 'absolute',
    right: -5,
    top: -7,
    width: 12,
    height: 12,
  },
});
