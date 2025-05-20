import React, {
  useReducer,
  createContext,
  Dispatch,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

let Store: React.Context<any>;

interface BaseStore {
  isPremium?: boolean;
  hasRatedTheApp?: boolean;
}

export function createStateProvider<T extends BaseStore>(
  initial: T,
  reducer: (state: T, action: { type: string; value: any }) => T,
  _persist: (keyof T)[]
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
    dispatch: Dispatch<{ type: string; value: any }>;
  }

  // Handle saved data to local storage of phone
  const STORAGE_KEY = '@rnx_storage';
  const _getFromStorage = () =>
    AsyncStorage.getItem(STORAGE_KEY).then(
      (d) => JSON.parse(d || '{}') as Partial<T>
    );
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

  const StateProvider = ({ children }: StateProviderProps) => {
    const [state, dispatch] = useReducer(
      (accState: T, action: { type: string; value: any }) => {
        // console.log('[RNX][StateProvider.dispatch] --> action', action);
        // console.log(
        //   '[RNX][StateProvider.dispatch] stateBefore',
        //   JSON.stringify(accState)
        // );
        let partialUpdate: Partial<T> = {};
        switch (action.type) {
          case 'set':
            partialUpdate = { ...partialUpdate, ...action.value };
            break;
          case '__initStateFromStorage__':
            partialUpdate = { ...partialUpdate, ...action.value };
            break;
        }
        const newState = {
          ...reducer({ ...accState, ...partialUpdate }, action),
        };
        _setToStorage(newState);
        // console.log(
        //   '[RNX][StateProvider.dispatch] <-- stateAfter',
        //   JSON.stringify(newState)
        // );
        return newState;
      },
      initial
    );

    useEffect(() => {
      _getFromStorage().then((savedState) => {
        dispatch({ type: '__initStateFromStorage__', value: savedState });
        console.log('[RNX] createStateProvider init');
      });
    }, []);

    return (
      <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
  };

  return { Element: StateProvider };
}

export function useGlobalState<T extends BaseStore>() {
  if (!Store) {
    throw 'Please initialize Store first using createStateProvider';
  }
  const { state, dispatch } = useContext(Store);

  const _dispatch = (actionType: string, actionValue: any) => {
    dispatch({ type: actionType, value: actionValue });
  };

  const setGlobalState = (partial: Partial<T>) => {
    dispatch({ type: 'set', value: partial });
  };

  return { globalState: state as T, dispatch: _dispatch, setGlobalState };
}
