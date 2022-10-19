import { EmitterSubscription, Platform } from 'react-native';
import {
  initConnection,
  endConnection,
  getAvailablePurchases,
  requestSubscription,
  getSubscriptions,
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
  PurchaseError,
  clearTransactionIOS,
  finishTransaction,
  SubscriptionIOS,
  SubscriptionAndroid,
} from 'react-native-iap';

export interface IapSubscriptionBase {
  id: string;
  durationMonth: number;
  freeTrialDaysDuration?: number;
}

export interface IapSubscription extends IapSubscriptionBase {
  price: number;
  localizedPrice: string;
}

let PREMIUM_PRODUCT_LIST: IapSubscriptionBase[] = [];

let purchaseUpdatedSubscription: EmitterSubscription | undefined;
let purchaseErrorSubscription: EmitterSubscription | undefined;
let onPurchaseSuccess: ((subscriptionId: string) => void) | undefined;
let onPurchaseError: (() => void) | undefined;

export const initIAP = (premiumSubscriptionIds: IapSubscriptionBase[]) => {
  PREMIUM_PRODUCT_LIST = premiumSubscriptionIds;
  try {
    console.log('[rnx] initIAP initConnection');
    // Init connection to store
    initConnection().then(async () => {
      // Clear pending transactions depending on devices
      if (Platform.OS === 'android') {
        // we make sure that "ghost" pending payment are removed
        // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
        console.log('[rnx] initIAP flushFailedPurchasesCachedAsPendingAndroid');
        await flushFailedPurchasesCachedAsPendingAndroid().catch((e) => {
          console.log(
            '[rnx] initIAP flushFailedPurchasesCachedAsPendingAndroid error',
            e
          );
          // exception can happen here if:
          // - there are pending purchases that are still pending (we can't consume a pending purchase)
          // in any case, you might not want to do anything special with the error
        });
      } else if (Platform.OS === 'ios') {
        console.log('[rnx] initIAP clearTransactionIOS');
        await clearTransactionIOS();
      }

      // Start purchase listeners
      console.log('[rnx] initIAP listen purchaseUpdatedListener');
      // Case purchase error
      purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          console.log('[rnx] IAP purchaseErrorListener triggered error', error);
          onPurchaseError && onPurchaseError();
        }
      );
      // Case purchase success
      purchaseUpdatedSubscription = purchaseUpdatedListener(
        async (purchase) => {
          console.log(
            '[rnx] IAP purchaseUpdatedListener triggered purchase',
            purchase
          );
          await finishTransaction({ purchase, isConsumable: false });
          if (
            PREMIUM_PRODUCT_LIST.map((p) => p.id.toLocaleLowerCase()).includes(
              purchase.productId.toLocaleLowerCase()
            )
          ) {
            onPurchaseSuccess && onPurchaseSuccess(purchase.productId);
          } else {
            console.log(
              '[rnx] IAP purchaseUpdatedListener error, purchase product id does not match our list of products',
              purchase.productId
            );
          }
        }
      );
    });
  } catch (e) {
    console.error('[rnx] initIAP error', e);
  }
};

export const closeIAP = () => {
  console.log('[rnx] closeIAP endConnection');
  if (purchaseUpdatedSubscription) {
    purchaseUpdatedSubscription.remove();
    purchaseUpdatedSubscription = undefined;
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
    purchaseErrorSubscription = undefined;
  }
  endConnection();
};

const checkInitGuard = () => {
  if (!PREMIUM_PRODUCT_LIST.length) {
    throw '[rnx] You need to call initIAP first';
  }
};

export const hasPurchasedPremium = async () => {
  checkInitGuard();
  try {
    console.log('[rnx] hasPurchasedPremium getAvailablePurchases');
    const purchases = await getAvailablePurchases();
    console.log(
      '[rnx] hasPurchasedPremium purchases.length',
      purchases.length,
      'ids',
      purchases.map((p) => p.productId)
    );
    return !!purchases.find(
      (p) =>
        PREMIUM_PRODUCT_LIST.filter(
          (p2) => p.productId.toLocaleLowerCase() === p2.id.toLocaleLowerCase()
        ).length
    );
  } catch (e) {
    console.log('[rnx] restore error', e);
    return Promise.reject();
  }
};

export const requestPurchase = async (iapId: string): Promise<boolean> => {
  checkInitGuard();
  try {
    console.log('[rnx] requestPurchase');
    await requestSubscription({
      sku: iapId,
      andDangerouslyFinishTransactionAutomaticallyIOS: false,
    });
    console.log('[rnx] requestPurchase done');
    return new Promise<boolean>((resolve) => {
      onPurchaseSuccess = (sku) => {
        console.log(
          '[rnx] requestPurchase onPurchaseSuccess triggered for product',
          sku
        );
        if (
          PREMIUM_PRODUCT_LIST.map((p) => p.id.toLocaleLowerCase()).includes(
            sku.toLocaleLowerCase()
          )
        ) {
          console.log(
            '[rnx] requestPurchase onPurchaseSuccess productId found. Purchase validated'
          );
          return resolve(true);
        } else {
          console.log(
            '[rnx] requestPurchase onPurchaseSuccess productId not matching'
          );
          return resolve(false);
        }
      };
      onPurchaseError = () => {
        console.log('[rnx] requestPurchase onPurchaseError triggered');
        return resolve(false);
      };
    });
  } catch (e) {
    console.log('[rnx] requestPurchase error', e);
    return Promise.reject();
  }
};

export const getIapSubscriptions = async (): Promise<IapSubscription[]> => {
  checkInitGuard();
  console.log('[rnx] getIapSubscriptions');
  const products = await getSubscriptions({
    skus: PREMIUM_PRODUCT_LIST.map((o) => o.id),
  });
  console.log('[rnx] getIapSubscriptions products.length', products.length);
  if (products && products.length) {
    return products.map((p) => {
      const base = PREMIUM_PRODUCT_LIST.find((p2) => p2.id === p.productId);
      // Use of (as any) as types are not corrects
      if (Platform.OS === 'android') {
        const platformProduct = p as SubscriptionAndroid;
        const prices =
          platformProduct.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList.find(
            (_p) => _p.formattedPrice.toLocaleLowerCase() !== 'free'
          ) ||
          platformProduct.subscriptionOfferDetails[0].pricingPhases
            .pricingPhaseList[
            platformProduct.subscriptionOfferDetails[0].pricingPhases
              .pricingPhaseList.length - 1
          ];
        return {
          id: platformProduct.productId,
          price: parseFloat(prices.priceAmountMicros) / 1000000,
          localizedPrice: prices.formattedPrice,
          durationMonth: base?.durationMonth || 0,
          freeTrialDaysDuration: base?.freeTrialDaysDuration,
        };
      }
      const platformProduct = p as SubscriptionIOS;
      return {
        id: platformProduct.productId,
        price: parseFloat(platformProduct.price),
        localizedPrice: platformProduct.localizedPrice,
        durationMonth: base?.durationMonth || 0,
        freeTrialDaysDuration: base?.freeTrialDaysDuration,
      };
    });
  }
  return [];
};
