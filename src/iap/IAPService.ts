import * as RNIap from 'react-native-iap';

export interface IapSubscriptionBase {
  id: string;
  durationMonth: number;
  freeTrialDaysDuration?: number;
}

export interface IapSubscription extends IapSubscriptionBase {
  price: number;
  localizedPrice: string;
  currency: string;
}

let PREMIUM_PRODUCT_LIST: IapSubscriptionBase[] = [];
let onPurchaseSuccess:
  | ((subscriptionId: string, value: number, currency: string) => void)
  | undefined;

export const initIAP = (
  premiumSubscriptionIds: IapSubscriptionBase[],
  _onPurchaseSuccess?: (
    subscriptionId: string,
    value: number,
    currency: string
  ) => void
) => {
  PREMIUM_PRODUCT_LIST = premiumSubscriptionIds;
  onPurchaseSuccess = _onPurchaseSuccess;
};

const initStore = async (): Promise<void | string> => {
  try {
    if (!PREMIUM_PRODUCT_LIST.length) {
      throw 'You need to call initIAP first';
    }
    console.log('hasPurchasedPremium initStore start');
    await RNIap.initConnection();
    console.log('hasPurchasedPremium initStore end');
  } catch (e) {
    // exception can happen here if:
    // - there are pending purchases that are still pending (we can't consume a pending purchase)
    // in any case, you might not want to do anything special with the error
    console.log('initStore error', e);
    return Promise.reject('initStore failed');
  }
};

export const hasPurchasedPremium = async () => {
  await initStore();
  try {
    console.log('hasPurchasedPremium getAvailablePurchases');
    const purchases = await RNIap.getAvailablePurchases();
    console.log('hasPurchasedPremium purchases.length', purchases.length);
    return !!purchases.find(
      (p) => PREMIUM_PRODUCT_LIST.filter((p2) => p.productId === p2.id).length
    );
  } catch (e) {
    console.log('restore error', e);
    return Promise.reject();
  }
};

export const requestPurchase = async (iapId: string): Promise<boolean> => {
  await initStore();
  try {
    const purchase = await RNIap.requestPurchase(iapId, false);
    console.log('Purchases', purchase);
    await RNIap.finishTransaction(purchase, false);
    const hasPurchased = await hasPurchasedPremium();
    if (hasPurchased && onPurchaseSuccess) {
      const products = await getIapSubscriptions();
      const boughtProduct = products.find((p) => p.id === iapId);
      if (boughtProduct) {
        onPurchaseSuccess(iapId, boughtProduct.price, boughtProduct.currency);
      }
    }
    return hasPurchased;
  } catch (e) {
    console.log('requestPurchase error', e);
    return Promise.reject();
  }
};

export const getIapSubscriptions = async (): Promise<IapSubscription[]> => {
  await initStore();
  const products = await RNIap.getSubscriptions(
    PREMIUM_PRODUCT_LIST.map((o) => o.id)
  );
  if (products && products.length) {
    return products.map((p) => {
      const base = PREMIUM_PRODUCT_LIST.find((p2) => p2.id === p.productId);
      return {
        id: p.productId,
        price: parseFloat(p.price),
        localizedPrice: p.localizedPrice,
        durationMonth: base?.durationMonth || 0,
        freeTrialDaysDuration: base?.freeTrialDaysDuration,
        currency: p.currency,
      };
    });
  }
  return [];
};
