import React, {
  useReducer,
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';

const STORAGE_KEY = '@rnx_storage';

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

let Store: React.Context<any>;

interface BaseStore {
  isPremium?: boolean;
  hasRatedTheApp?: boolean;
}

export enum BaseStoreActionsType {
  'set' = 'set',
  '__initStateFromStorage__' = '__initStateFromStorage__',
}

interface CommonAction {
  type: string;
  value: any;
}

export interface BaseStoreAction extends CommonAction {
  type: BaseStoreActionsType;
  value: any;
}

export type StandardActionTypeEnum = {
  [id: string]: string;
};

export function createStateProvider<
  T extends BaseStore,
  CustomActionType extends StandardActionTypeEnum
>(
  initial: T,
  reducer: (
    accState: T,
    action: { type: CustomActionType | BaseStoreActionsType; value: any }
  ) => T,
  _persist: (keyof T)[],
  middleWare?: (
    accState: T,
    action: { type: CustomActionType | BaseStoreActionsType; value: any }
  ) => Promise<{ type: CustomActionType | BaseStoreActionsType; value: any }>
) {
  const persist = [
    ..._persist.filter((p) => p !== 'isPremium' && p !== 'hasRatedTheApp'),
    'isPremium',
    'hasRatedTheApp',
  ];
  console.log(
    '[RNX] createStateProvider, will persist keys',
    JSON.stringify(persist)
  );
  interface Context {
    state: T;
    dispatch: Dispatch<{
      type: CustomActionType;
      value: any;
    }>;
  }

  // Save to storage only keys that match @persist param
  const _setToStorage = (data: Partial<T>) => {
    const persitableData: Partial<T> = {};
    Object.keys(data).forEach((key) => {
      const keyOfT = key as keyof T;
      if (persist.includes(keyOfT)) {
        persitableData[keyOfT] = data[keyOfT];
      }
    });
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persitableData));
  };

  // Create provider
  const initialContext: Context = {
    state: initial,
    dispatch: () => {},
  };
  Store = createContext(initialContext);

  const _internalReducer = (
    accState: T,
    action: { type: CustomActionType | BaseStoreActionsType; value: any }
  ) => {
    console.log('[RNX] action:', action.type);
    let partialUpdate: T = { ...accState };
    switch (action.type) {
      case BaseStoreActionsType.set:
        partialUpdate = { ...partialUpdate, ...action.value };
        break;
      case BaseStoreActionsType.__initStateFromStorage__:
        partialUpdate = { ...partialUpdate, ...action.value };
        break;
    }
    const newState = {
      ...reducer(partialUpdate, action),
    };
    _setToStorage(newState);
    return newState;
  };

  const StateProvider = ({ children }: StateProviderProps) => {
    const [isInit, setIsInit] = useState(false);
    const [state, dispatch] = useReducer(_internalReducer, initial);

    useEffect(() => {
      getGlobalStateFromStorage<T>().then((savedState) => {
        dispatch({
          type: BaseStoreActionsType.__initStateFromStorage__,
          value: savedState,
        });
        console.log('[RNX] createStateProvider init');
        setIsInit(true);
      });
    }, []);

    // Used by our dispatchMiddleware to avoid
    // multiple update of the func
    const stateRef = useRef(state);
    useEffect(() => {
      stateRef.current = state;
    }, [state]);

    const dispatchMiddleware = useCallback(
      async (action: {
        type: CustomActionType | BaseStoreActionsType;
        value: any;
      }) => {
        let finalAction = action;
        if (middleWare) {
          finalAction = await middleWare(stateRef.current, action);
        }
        dispatch(finalAction);
      },
      [dispatch]
    );

    return (
      <Store.Provider value={{ state, dispatch: dispatchMiddleware }}>
        {isInit ? children : <SplashScreen />}
      </Store.Provider>
    );
  };

  return { Element: StateProvider };
}

export function useGlobalState<T extends BaseStore>() {
  if (!Store) {
    throw 'Please initialize Store first using createStateProvider';
  }
  const { state, dispatch } = useContext(Store);

  const _dispatch = useCallback(
    (actionType: string, actionValue: any) => {
      dispatch({ type: actionType, value: actionValue });
    },
    [dispatch]
  );

  const setGlobalState = useCallback(
    (partial: Partial<T>) => {
      dispatch({ type: BaseStoreActionsType.set, value: partial });
    },
    [dispatch]
  );

  return {
    globalState: state as T,
    dispatch: _dispatch,
    setGlobalState,
  };
}

export function useDispatch<Action extends CommonAction>() {
  if (!Store) {
    throw 'Please initialize Store first using createStateProvider';
  }
  const { dispatch } = useContext(Store);
  const dispatchAction = useCallback(
    (action: Action) => {
      dispatch(action);
    },
    [dispatch]
  );
  return dispatchAction;
}

// Handle saved data to local storage of phone
export function getGlobalStateFromStorage<T extends BaseStore>() {
  return AsyncStorage.getItem(STORAGE_KEY).then(
    (d) => JSON.parse(d || '{}') as Partial<T>
  );
}
