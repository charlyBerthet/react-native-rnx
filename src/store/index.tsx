import React, { useReducer, createContext, Dispatch, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

let Store: React.Context<any>;

export function createStateProvider<T>(
  initial: T,
  reducer: (state: T, action: { type: string; value: any }) => T,
  persist: (keyof T)[]
): Promise<{ Element: ({ children }: StateProviderProps) => JSX.Element }> {
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
    console.log(
      '[RNX] createStateProvider, _setToStorage value',
      JSON.stringify(persitableData)
    );
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persitableData));
  };

  // Get saved data
  return _getFromStorage().then((savedData) => {
    console.log(
      '[RNX] createStateProvider, _getFromStorage value',
      JSON.stringify(savedData)
    );
    // Merge it with desired initial data
    const initialStateMerged = {
      ...initial,
      ...savedData,
    };
    console.log(
      '[RNX] createStateProvider, initialStateMerged value',
      JSON.stringify(initialStateMerged)
    );
    // Save merged data to storage
    return _setToStorage(initialStateMerged).then(() => {
      // Create provider
      const initialContext: Context = {
        state: initialStateMerged,
        dispatch: () => {},
      };
      Store = createContext(initialContext);

      const StateProvider = ({ children }: StateProviderProps) => {
        const [state, dispatch] = useReducer(
          (accState: T, action: { type: string; value: any }) => {
            console.log('[RNX][StateProvider.dispatch] --> action', action);
            console.log(
              '[RNX][StateProvider.dispatch] stateBefore',
              JSON.stringify(accState)
            );
            let partialUpdate: Partial<T> = {};
            switch (action.type) {
              case 'set':
                partialUpdate = { ...partialUpdate, ...action.value };
                break;
            }
            const newState = {
              ...reducer({ ...accState, ...partialUpdate }, action),
            };
            _setToStorage(newState);
            console.log(
              '[RNX][StateProvider.dispatch] <-- stateAfter',
              JSON.stringify(newState)
            );
            return newState;
          },
          initial
        );
        return (
          <Store.Provider value={{ state, dispatch }}>
            {children}
          </Store.Provider>
        );
      };

      return { Element: StateProvider };
    });
  });
}

export function useGlobalState<T>() {
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
