import * as RNIap from 'react-native-iap';

let PREMIUM_MONTHLY = '';
const PREMIUM_PRODUCT_IDS = ['premiumv1', PREMIUM_MONTHLY];

export const initIAP = (premiumMonthlySku: string) => {
  PREMIUM_MONTHLY = premiumMonthlySku;
};

const initStore = async (): Promise<void | string> => {
  try {
    if (!PREMIUM_MONTHLY) {
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
    const purchases = await RNIap.getAvailablePurchases();
    console.log('hasPurchasedPremium purchases.length', purchases.length);
    return !!purchases.find((p) => PREMIUM_PRODUCT_IDS.includes(p.productId));
  } catch (e) {
    console.log('restore error', e);
    return Promise.reject();
  }
};

export const requestPurchase = async (): Promise<
  RNIap.ProductPurchase | undefined
> => {
  await initStore();
  try {
    const purchase = await RNIap.requestPurchase(PREMIUM_MONTHLY, false);
    console.log('Purchases', purchase);
    await RNIap.finishTransaction(purchase, false);
    return;
  } catch (e) {
    console.log('requestPurchase error', e);
    return Promise.reject();
  }
};

export const getProducts = async (
  productIds: string[]
): Promise<RNIap.Product[]> => {
  await initStore();
  const products = await RNIap.getProducts(productIds);
  if (products && products.length) {
    return products;
  }
  return [];
};

export const getPriceForOneExport = async (): Promise<string | undefined> => {
  const prods = await getProducts([PREMIUM_MONTHLY]);
  if (!prods || !prods.length) {
    return '$$';
  }
  return prods[0].localizedPrice;
};
