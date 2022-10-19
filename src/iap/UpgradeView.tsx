import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  useColorScheme,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  useLocalization,
  Text,
  useTheme,
  Link,
  IapSubscription,
  getIapSubscriptions,
  hasPurchasedPremium,
  useIsPremium,
  requestPurchase,
  useBottomSheet,
} from 'react-native-rnx';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const getCurrency = (str: string) => {
  return str.replace(/[\d,. ]+/, '');
};

interface Props {
  screenHeight: number;
  onCancel: () => void;
  onContinue?: () => void;
}

const Component: React.FC<Props> = ({ screenHeight, onCancel, onContinue }) => {
  const { localize } = useLocalization();
  const theme = useTheme();
  const [iapList, setIapList] = useState<IapSubscription[] | null>();
  const [selectedIap, setSelectedIap] = useState<IapSubscription | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRestore, setIsLoadingRestore] = useState(false);
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);
  const { setIsPremium } = useIsPremium();

  useEffect(() => {
    getIapSubscriptions().then((list) => {
      const usableList = list.filter(
        (l) => l.durationMonth === 1 || l.durationMonth === 12
      );
      setIapList(usableList.sort((a, b) => a.price - b.price));
      setSelectedIap(
        usableList.find((p) => !!p.freeTrialDaysDuration) || usableList[0]
      );
      setIsLoading(false);
    });
  }, [setIapList, setIsLoading]);

  const _close = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const _success = useCallback(() => {
    Alert.alert(localize('iap.successtitle'), localize('iap.successmsg'), [
      {
        text: localize('iap.continue'),
        onPress: () => {
          if (onContinue) {
            onContinue();
          } else {
            console.log('[rnx] UpgradeView close from _success');
            _close();
          }
        },
      },
    ]);
  }, [localize, onContinue, _close]);

  const _restore = useCallback(() => {
    console.log('restore');
    setIsLoadingRestore(true);
    hasPurchasedPremium().then((hasPurchase) => {
      setIsPremium(hasPurchase);
      setIsLoadingRestore(false);
      if (hasPurchase) {
        _success();
      } else {
        Alert.alert(
          localize('iap.restoreerrortitle'),
          localize('iap.restoreerrormsg')
        );
      }
    });
  }, [setIsPremium, localize, _success]);

  const _subscribe = useCallback(() => {
    if (selectedIap) {
      setIsLoadingPurchase(true);
      // hasPurchasedPremium().then((hasPurchase) => {
      // if ( hasPurchase) {
      //   setIsPremium(true);
      //   setIsLoadingPurchase(false);
      //   _success();
      // } else {
      requestPurchase(selectedIap.id).then(
        (_hasPurchase) => {
          setIsPremium(_hasPurchase);
          setIsLoadingPurchase(false);
          if (_hasPurchase) {
            _success();
          } else {
            Alert.alert(
              localize('iap.purchaseerrortitle'),
              localize('iap.purchaseerrormsg')
            );
          }
        },
        () => {
          // Error/canceled
          setIsLoadingPurchase(false);
        }
      );
      // }
      // });
    }
  }, [setIsLoadingPurchase, selectedIap, localize, setIsPremium, _success]);

  const _openTerms = useCallback(() => {
    Linking.openURL('https://berthx.io/terms/');
  }, []);

  const _openPrivacy = useCallback(() => {
    Linking.openURL('https://berthx.io/policy/');
  }, []);

  const _skip = useCallback(() => {
    console.log('[rnx] UpgradeView close from _skip');
    _close();
  }, [_close]);

  const _tapClose = useCallback(() => {
    console.log('[rnx] UpgradeView close from _tapClose');
    _close();
  }, [_close]);

  console.log('[rnx] UpgradeView render');
  return (
    <View style={[styles.root, { height: screenHeight }]}>
      <Image
        source={require('@assets/images/iap/bg.jpg')}
        style={[styles.headerImg, { backgroundColor: theme.borderColor }]}
        resizeMode="cover"
      />
      <Image
        source={require('@assets/images/iap/bg-hd.jpg')}
        style={[styles.headerImg, { backgroundColor: theme.borderColor }]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
          style={styles.featuresBackdropTop}
        />
        <View style={styles.topnav}>
          <View style={styles.topnavLeft}>
            <TouchableOpacity style={[styles.topnavBtn]} onPress={_tapClose}>
              <Icon name="times" color="white" size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.topnavTitle}>{localize('iap.title')}</Text>
          <View style={styles.topnavRight}>
            <TouchableOpacity
              style={[styles.topnavBtn]}
              onPress={_restore}
              disabled={isLoading || isLoadingRestore || isLoadingPurchase}
            >
              {isLoadingRestore ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.topnavBtnTxt}>
                  {localize('iap.restore')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
            style={styles.featuresBackdrop}
          />
          <Text style={styles.featuresTitle}>
            {localize('iap.featurestitle')}
          </Text>
          <Text style={styles.featuresTxt}>{localize('iap.features')}</Text>
        </View>
        <View
          style={[
            styles.bottomContent,
            {
              backgroundColor: theme.bgColor,
            },
          ]}
        >
          {iapList?.map((iap) => (
            <SubscribeRow
              key={iap.id}
              isActive={iap.id === selectedIap?.id}
              iap={iap}
              onPress={setSelectedIap}
            />
          ))}
          {isLoading && (
            <View style={styles.loadingRows}>
              <ActivityIndicator size="large" />
            </View>
          )}

          <TouchableOpacity
            onPress={_subscribe}
            activeOpacity={0.6}
            disabled={isLoading || isLoadingRestore || isLoadingPurchase}
            style={[styles.btnMain, { backgroundColor: theme.primaryColor }]}
          >
            <View style={styles.btnMainTitleContainer}>
              <Text
                style={[
                  styles.btnMainTitle,
                  { color: theme.txtColorOnPrimaryColor },
                ]}
              >
                {localize('iap.btnMain')}
              </Text>
              {selectedIap?.freeTrialDaysDuration && (
                <Text
                  style={[
                    styles.btnMainSubtitle,
                    { color: theme.txtColorOnPrimaryColor },
                  ]}
                >
                  {localize('iap.autodeductAfter', {
                    x: selectedIap.freeTrialDaysDuration,
                  })}
                </Text>
              )}
            </View>
            {isLoadingPurchase ? (
              <ActivityIndicator
                style={styles.btnMainArrow}
                color={theme.txtColorOnPrimaryColor}
              />
            ) : (
              <Icon
                name="chevron-right"
                size={20}
                color={theme.txtColorOnPrimaryColor}
                style={styles.btnMainArrow}
              />
            )}
          </TouchableOpacity>

          <Link
            style={styles.skip}
            title={localize('iap.skip')}
            onPress={_skip}
          />

          <Text style={styles.disclaimer}>{localize('iap.disclaimer')}</Text>
          <View style={styles.policies}>
            <Link title={localize('iap.terms')} onPress={_openTerms} />
            <Link title={localize('iap.privacy')} onPress={_openPrivacy} />
          </View>
        </View>
      </View>
    </View>
  );
};

const SubscribeRow = (props: {
  isActive: boolean;
  iap: IapSubscription;
  onPress: (iap: IapSubscription) => void;
}) => {
  const theme = useTheme();
  const { localize } = useLocalization();
  const { iap } = props;
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={() => props.onPress(iap)}
      activeOpacity={0.8}
      style={[
        styles.row,
        props.isActive &&
          (isDarkTheme ? styles.rowActiveDark : styles.rowActive),
      ]}
    >
      <View
        style={[
          styles.check,
          { borderColor: theme.primaryColor },
          props.isActive && { backgroundColor: theme.primaryColor },
        ]}
      >
        {props.isActive && (
          <Icon name="check" color={theme.txtColorOnPrimaryColor} size={14} />
        )}
      </View>
      <View style={styles.rowContent}>
        <View style={styles.rowTitleContainer}>
          <Text style={styles.rowTitle}>
            {localize('iap.rowTitle', {
              price: iap.localizedPrice,
              duration:
                iap.durationMonth === 12
                  ? localize('iap.rowTitleYear')
                  : localize('iap.rowTitleMonth'),
            })}
          </Text>
          {iap.durationMonth !== 1 && (
            <Text style={styles.rowPricePerMonth}>
              {localize('iap.rowPricePerMonth', {
                price: `${getCurrency(iap.localizedPrice)}${(
                  iap.price / iap.durationMonth
                ).toFixed(2)}`,
              })}
            </Text>
          )}
        </View>

        {!!iap.freeTrialDaysDuration && (
          <Text
            style={[
              styles.rowFreeTrial,
              {
                color: theme.primaryTxtColor,
              },
            ]}
          >
            {localize('iap.freetrial', {
              duration: iap.freeTrialDaysDuration,
            })}
          </Text>
        )}
      </View>

      {!!iap.freeTrialDaysDuration && props.isActive && (
        <Icon name="star" solid color="#efbb00" size={22} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
  headerImg: {
    height: Dimensions.get('window').height - 300,
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
  },
  bottomContent: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
  },
  rowActive: {
    backgroundColor: '#eee',
  },
  rowActiveDark: {
    backgroundColor: '#222',
  },
  rowContent: {
    flex: 1,
  },
  rowTitleContainer: {
    flexDirection: 'row',
  },
  check: {
    borderWidth: 2,
    borderRadius: 100,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1,
    marginRight: 10,
  },
  rowTitle: {
    fontWeight: '900',
    fontSize: 14,
  },
  rowPricePerMonth: {
    fontWeight: '700',
    fontSize: 13,
    opacity: 0.7,
    marginLeft: 5,
  },
  rowFreeTrial: {
    fontWeight: '900',
    fontSize: 10,
  },
  btnMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 65,
    marginHorizontal: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  btnMainTitleContainer: {
    alignItems: 'center',
  },
  btnMainTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  btnMainSubtitle: {
    fontSize: 10,
    fontWeight: '600',
  },
  btnMainArrow: {
    position: 'absolute',
    right: 15,
  },
  skip: {
    marginTop: 10,
    transform: [{ scale: 0.9 }],
  },
  disclaimer: {
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 11,
    marginTop: 0,
    marginBottom: 0,
  },
  policies: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    transform: [{ scale: 0.8 }],
  },
  featuresBackdropTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -50,
    height: 150,
  },
  featuresBackdrop: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    top: -50,
  },
  featuresContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 0,
  },
  featuresTitle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 8,
  },
  featuresTxt: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 5,
  },
  topnav: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 999,
    paddingVertical: 15,
    alignItems: 'center',
  },
  topnavTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
  },
  topnavBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  topnavBtnTxt: {
    color: 'white',
    fontWeight: '700',
  },
  topnavLeft: {
    position: 'absolute',
    left: 0,
    zIndex: 9999,
  },
  topnavRight: {
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  loadingRows: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export const UpgradeViewSheet = () => {
  const sheet = useBottomSheet();
  console.log('[rnx] UpgradeViewSheet render');
  return (
    <Component
      screenHeight={Dimensions.get('window').height - 50}
      onCancel={() => sheet.hideBottomSheet()}
    />
  );
};

export default Component;
