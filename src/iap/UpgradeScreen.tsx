import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import { useIsPremium } from './useIsPremium';
import { useLocalization } from '../localization';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { Link, Button } from '../ui';
import * as IAPService from './IAPService';

interface Props {
  route: {
    params: {
      features: {
        img: any;
        label: string;
      }[];
    };
  };
}

export const UpgradeScreen = (props: Props) => {
  const theme = useTheme();
  const { localize } = useLocalization();
  const navigation = useNavigation();
  const [price, setPrice] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageIdx, setPageIsx] = useState(0);
  const { setIsPremium } = useIsPremium();

  const pages = props.route.params.features;

  const restore = useCallback(() => {
    setIsLoading(true);
    console.log('Upgrade.restore');
    IAPService.hasPurchasedPremium()
      .then((has) => {
        setIsPremium(has);
        console.log('Upgrade.restore hasPurchasedPremium', has);
        if (has) {
          navigation.goBack();
        } else {
          Alert.alert(localize('upgrade.noPurchaseFound'));
        }
      })
      .catch((error) => {
        console.log('Upgrade.restore hasPurchasedPremium error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, localize, navigation, setIsPremium]);

  // Configure Header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Link
          title={localize('upgrade.back')}
          onPress={navigation.goBack}
          disabled={isLoading}
        />
      ),
      headerRight: () => (
        <Link
          title={localize('upgrade.pageHeaderRightBtn')}
          onPress={restore}
          disabled={isLoading}
        />
      ),
      title: '',
    });
  }, [localize, navigation, isLoading, restore]);

  const onContinue = () => {
    navigation.goBack();
  };

  const requestPurchase = () => {
    setIsLoading(true);
    IAPService.requestPurchase()
      .then(() => {
        setIsPremium(true);
        navigation.goBack();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    IAPService.getPriceForOneExport()
      .then(setPrice)
      .then(() => setIsLoading(false));
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <Text style={[styles.title, { color: theme.txtColor }]}>
        {localize('upgrade.title')}
      </Text>
      <Text style={[styles.subtitle, { color: theme.txtColor }]}>
        {localize('upgrade.subtitle', { price })}
      </Text>
      <View style={styles.pagerContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.txtColor} />
        ) : (
          <View style={styles.pager}>
            <PagerProvider activeIndex={pageIdx} onChange={setPageIsx}>
              <Pager>
                {pages.map((p, i) => (
                  <View style={styles.slide} key={i}>
                    <Image
                      source={p.img}
                      style={styles.slideImg}
                      resizeMode="contain"
                    />
                    <Text style={[styles.slideTxt, { color: theme.txtColor }]}>
                      {p.label}
                    </Text>
                  </View>
                ))}
              </Pager>
            </PagerProvider>
            <View style={styles.dots}>
              {pages.map((_, i) => (
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: theme.txtColor },
                    i === pageIdx && styles.dotActive,
                  ]}
                  key={i}
                />
              ))}
            </View>
          </View>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.details, { color: theme.txtColor }]}>
          {localize('upgrade.detailPrice', { price })}
        </Text>
      </View>
      <View style={styles.mainBtn}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          iterationDelay={2000}
        >
          <Button
            title={localize('upgrade.mainBtn')}
            full
            rightArrow
            important
            disabled={isLoading}
            onPress={requestPurchase}
          />
        </Animatable.View>
        <View style={styles.subBtn}>
          <Link
            title={localize('upgrade.secondBtn')}
            disabled={isLoading}
            onPress={() => onContinue()}
          />
        </View>
        <View style={styles.disclaimer}>
          <Text style={[styles.disclaimerText, { color: theme.txtColor }]}>
            {localize('upgrade.disclaimer', {
              btnName: localize('upgrade.mainBtn'),
            })}
            <Text
              style={styles.disclaimerBtn}
              onPress={() => Linking.openURL('https://berthx.io/policy/')}
            >
              {` ${localize('upgrade.privacyPolicy')}`}
            </Text>
            {` ${localize('upgrade.and')}`}
            <Text
              style={styles.disclaimerBtn}
              onPress={() => Linking.openURL('https://berthx.io/terms/')}
            >
              {` ${localize('upgrade.termsOfUse')}`}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 28,
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    marginTop: 5,
    maxWidth: 325,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  detailsContainer: {
    marginBottom: 10,
  },
  slideTxt: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 20,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImg: {
    height: Dimensions.get('window').height > 770 ? 200 : 170,
  },
  pagerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pager: {
    height: Dimensions.get('window').height > 770 ? 280 : 230,
  },
  details: {
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '400',
    fontSize: 12,
    marginBottom: 2,
    paddingHorizontal: 12,
  },
  mainBtn: {
    marginBottom: 5,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    opacity: 0.5,
    height: 8,
    width: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  dotActive: {
    opacity: 1,
  },
  subBtn: {
    marginTop: 15,
  },
  disclaimer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  disclaimerText: {
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '400',
    fontSize: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
    lineHeight: 15,
  },
  disclaimerBtn: {
    fontWeight: '700',
  },
});
